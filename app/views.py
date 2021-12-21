from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import generics, viewsets
from .models import *
from rest_framework.permissions import AllowAny, SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, \
    BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from .serializers import QuestionSerializer, CommentSerializer
# , QuestionElasticSearchSerializer
from rest_framework import filters
from datetime import datetime
from django.db.models import F

from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    CompoundSearchFilterBackend
)
from .documents import QuestionDocument


# class PublisherDocumentView(DocumentViewSet):
#     permission_classes = [AllowAny]
#     document = QuestionDocument
#     serializer_class = QuestionElasticSearchSerializer
#     fielddata = True
#
#     filter_backends = [
#         FilteringFilterBackend,
#         CompoundSearchFilterBackend
#     ]
#
#     search_fields = ('title', 'content')
#     multi_match_search_fields = ('title', 'content')
#     filter_fields = {
#         'title': 'title',
#         'content': 'content',
#     }
#     fields_fields = {
#         'title': 'title',
#         'content': 'content',
#     }


class UserWritePermission(BasePermission):
    message = 'Editing object is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        # neu method la get list, get object thi co quyen
        # neu method la update thi check obj.author == user thi co quyen
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


# danh sach question all list view api
class QuestionList(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    # def get_queryset(self):
    #     user = self.request.user
    #     return Question.objects.filter(author=user)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_top_list_question(request):
    question_list = Question.objects.filter(status='published').order_by('-created')[:25]
    if not question_list:
        return Response({"code": 400, "message": "Bad Request"})
    result = []
    for question in question_list:
        author = question.author
        result.append({
            'id': question.id,
            'comment': question.number_comment,
            'view': question.view,
            'vote': question.upvote - question.down_vote,
            'title': question.title,
            'created': str(question.created),
            'author': {'id': author.id, 'first_name': author.first_name or author.user_name},
            'tags': [tag.name for tag in question.tags.all()]
        })
    return Response({'code': 200, 'questions': result})


# chi tiet question filter bang slug ->retrieve view api
class QuestionDetail(generics.RetrieveAPIView):
    serializer_class = QuestionSerializer
    queryset = Question.questionObjects.all()
    permission_classes = [AllowAny]


# danh sach question filter theo slug bat dau bang key (all) => listviewapi
class QuestionListDetailFilter(generics.ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']

    # '^' Starts-with search.
    # '=' Exact matches.
    # '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.


# danh sach question filter theo slug bat dau bang key (all) -> listviewapi
# class PostSearch(generics.ListAPIView):
#     permission_classes = [AllowAny]
#     queryset = Question.objects.all()
#     serializer_class = QuestionSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ['^slug']

# def get_object(self, queryset=None, **kwargs):
#     item = self.kwargs.get('pk')
#     return get_object_or_404(Post, slug=item)

# Define Custom Queryset
# def get_queryset(self):
#     return Post.objects.all()

# class CreateQuestion(generics.CreateAPIView):
#     permission_classes = [IsAuthenticated]
#     queryset = Question.objects.all()
#     serializer_class = QuestionSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_question(request):
    data = request.data
    title = data.get('title')
    slug = data.get('slug')
    content = data.get('content')
    tags = data.get('tags')
    user = request.user

    if not title or not content:
        return Response({"code": 400, "message": "Bad Request"})

    has_question = Question.objects.filter(slug=slug).exists()
    if has_question:
        unique_str = datetime.now().strftime('%Y%m-%d%H-%M%S-')
        slug += unique_str
    new_question = Question.objects.create(slug=slug, content=content, title=title, author=user)
    if tags:
        list_tags = tags.split()
        for tag in list_tags:
            tag_record = Tag.objects.filter(name=tag)
            if tag_record.exists():
                tag_record[0].number_posts += 1
                tag_record[0].save()
                new_question.tags.add(tag_record[0].pk)
            else:
                tag_record = Tag.objects.create(name=tag, number_posts=1)
                new_question.tags.add(tag_record.pk)

    return Response({'code': 200, 'message': 'success', 'question_id': new_question.pk})


# has_object_permission
@api_view(['PUT'])
@permission_classes([UserWritePermission])
def edit_question(request, pk):
    data = request.data
    title = data.get('title')
    slug = data.get('slug')
    content = data.get('content')
    tags = data.get('tags')
    question = Question.objects.get(pk=pk)
    if not question:
        return Response({"code": 400, "message": "Bad Request"})
    old_tags = question.tags.all().values_list('name', flat=True)
    new_tags = tags.split()
    for tag in new_tags:
        if tag not in old_tags:
            tag_record = Tag.objects.filter(name=tag)
            if tag_record.exists():
                tag_record[0].number_posts += 1
                tag_record[0].save()
                question.tags.add(tag_record[0].pk)
            else:
                tag_record = Tag.objects.create(name=tag, number_posts=1)
                question.tags.add(tag_record.pk)
    for tag in old_tags:
        if tag not in new_tags:
            tag_record = Tag.objects.filter(name=tag)
            if tag_record.exists():
                tag_record[0].number_posts -= 1
                tag_record[0].save()
                question.tags.remove(tag_record[0].pk)
    question.content = content
    question.slug = slug
    question.title = title
    question.save()
    return Response({'code': 200, 'message': 'success'})


class DeleteQuestion(generics.DestroyAPIView):
    permission_classes = [UserWritePermission]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request):
    data = request.data
    user = request.user
    question_id = data.get('question')
    parent_id = data.get('parent_comment')
    content = data.get('content')
    if not content or (question_id and parent_id):
        return Response({"code": 400, "message": "Bad Request"})
    question = Question.objects.filter(pk=question_id)
    parent_comment = Comment.objects.filter(pk=parent_id)
    comment = Comment.objects.create(content=content, author=user)
    if question.exists():
        comment.question = question[0]
        question.update(number_comment=F('number_comment') + 1)
    if parent_comment.exists():
        comment.parent_comment = parent_comment[0]
    comment.save()
    return Response({'id': comment.id,
                     'content': content,
                     'confirmed': comment.confirmed,
                     'last_update': comment.last_update,
                     'created_at': comment.created,
                     })


@api_view(['PUT'])
@permission_classes([UserWritePermission])
def edit_comment(request, pk):
    content = request.data.get('content')
    comment = Comment.objects.get(pk=pk)
    if not comment:
        return Response({"code": 400, "message": "Bad Request"})
    comment.content = content
    comment.save()
    return Response({'code': 200, 'message': 'success', 'id': pk, 'content': content})


class CommentDelete(generics.DestroyAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [UserWritePermission]


def comment_instance_to_list(comment):
    comment_dict = {'content': comment.content, 'created': str(comment.created), 'id': comment.pk}
    author = comment.author
    comment_dict['author'] = [author.id, author.first_name or author.user_name, str(author.image), author.last_name]
    return comment_dict


# @api_view()
# @permission_classes([AllowAny])
# def get_comments(request, question_id=None):
#     comments = Comment.objects.filter(question=question_id, parent_comment=None).prefetch_related('comment_set')
#     comment_dicts = []
#     for comment in comments:
#         comment_dict = comment_instance_to_list(comment)
#         child_comments = comment.comment_set.all()
#         list_child_comments = []
#         for child_comment in child_comments:
#             list_child_comment = comment_instance_to_list(child_comment)
#             list_child_comments.append(list_child_comment)
#
#         comment_dict['comment_set'] = list_child_comments
#         comment_dicts.append(comment_dict)
#
#     return Response({'data': comment_dicts})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_question(request, question_id=None):
    if not question_id:
        Response({"code": 400, "message": "Bad Request"})
    question = Question.objects.get(pk=question_id)
    if not question:
        Response({"code": 400, "message": "Bad Request"})
    question.view += 1
    question.save()
    author_question = question.author
    user = request.user
    following = True
    if user.is_anonymous or question_id not in user.follow_posts.all().values_list('id', flat=True):
        following = False
    question_data = {'id': question_id, 'content': question.content, 'title': question.title,
                     'numberComment': question.number_comment, 'comments': [],
                     'upvote': question.upvote,
                     'view': question.view,
                     'author': {
                         'first_name': author_question.first_name or author_question.user_name,
                         'last_name': author_question.last_name,
                         'image': author_question.image.name,
                         'user_name': author_question.user_name,
                         'use_full_comment': author_question.use_full_comment,
                         'id': author_question.pk
                     },
                     'down_vote': question.down_vote,
                     'tags': list(question.tags.all().values_list('name', flat=True)),
                     'last_update': question.last_update, 'created_at': question.created,
                     'slug': question.slug,
                     'following': following
                     }

    for comment in question.comment_set.all():
        author = comment.author
        comment_following = True
        if user.is_anonymous or comment.pk not in user.follow_comments.all().values_list('id', flat=True):
            comment_following = False
        current_comment = {
            'id': comment.id,
            'content': comment.content,
            'author': {'first_name': author.first_name or author.user_name,
                       'last_name': author.last_name,
                       'user_name': author.user_name,
                       'image': author.image.name,
                       'use_full_comment': author.use_full_comment,
                       'id': author.pk
                       },
            'confirmed': comment.confirmed,
            'last_update': str(comment.last_update),
            'created_at': str(comment.created),
            'upvote': comment.upvote,
            'down_vote': comment.down_vote,
            'following': comment_following
        }
        list_child_comments = []
        for child_comment in comment.comment_set.all():
            list_child_comment = comment_instance_to_list(child_comment)
            list_child_comments.append(list_child_comment)
        current_comment['child_comments'] = list_child_comments
        question_data['comments'].append(current_comment)
    return Response(question_data)


def vote(request, type_model):
    model = Question.objects
    model_vote = VoteQuestion.objects
    if type_model == 'comment':
        model = Comment.objects
        model_vote = VoteComment.objects

    user = request.user
    type = request.data.get('type')
    obj_id = request.data.get('obj_id')
    obj = model.get(pk=obj_id)
    if not user or not obj:
        return {"code": 400, "message": "Bad Request"}
    if type_model == 'comment':
        voted = model_vote.filter(user=user, comment=obj)
    else:
        voted = model_vote.filter(user=user, question=obj)
    if not voted:
        if type_model == 'comment':
            model_vote.create(comment=obj, user=user)
        else:
            model_vote.create(question=obj, user=user)
        if type == 'upvote':
            obj.upvote += 1
        else:
            obj.down_vote += 1
        obj.save()
        return {'code': 200, 'message': 'success', 'upvote': obj.upvote, 'down_vote': obj.down_vote}
    voted = voted[0]
    if type == voted.type:
        return {'code': 200, 'message': 'success', 'upvote': obj.upvote, 'down_vote': obj.down_vote}
    if type == 'upvote':
        voted.type = 'upvote'
        obj.upvote += 1
        obj.down_vote -= 1
        obj.save()
    else:
        voted.type = 'down_vote'
        obj.upvote -= 1
        obj.down_vote += 1
        obj.save()
    voted.save()
    return {'code': 200, 'message': 'success', 'upvote': obj.upvote, 'down_vote': obj.down_vote}


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def vote_post(request):
    result = vote(request, 'question')
    return Response(result)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def vote_comment(request):
    result = vote(request, 'comment')
    return Response(result)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_post(request):
    user = request.user
    question_id = request.data.get('question_id', None)
    question = Question.objects.get(pk=question_id)
    if not question:
        return Response({"code": 400, "message": "Bad Request"})
    list_post_following = user.follow_posts.all().values_list('id', flat=True)
    if question_id in list_post_following:
        user.follow_posts.remove(question)
    else:
        user.follow_posts.add(question)
    return Response({'code': 200})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_comment(request):
    user = request.user
    comment_id = request.data.get('comment_id', None)
    comment = Comment.objects.get(pk=comment_id)
    if not comment:
        return Response({"code": 400, "message": "Bad Request"})
    list_comment_following = user.follow_comments.all().values_list('id', flat=True)
    if comment_id in list_comment_following:
        user.follow_comments.remove(comment)
    else:
        user.follow_comments.add(comment)
    return Response({'code': 200})

# todo:
# comment lai phan elastic search de phat trien tiep
# bo comment phan serializer trong views.py, serializers.py import lib django-elasticsearch trong settings
# bo comment trong urls.py