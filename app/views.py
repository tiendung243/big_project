from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import generics, viewsets
from .models import *
from rest_framework.permissions import AllowAny, SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, \
    BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from django.shortcuts import get_object_or_404
from .serializers import QuestionSerializer, CommentSerializer
from rest_framework import filters


class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'

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

class CreateQuestion(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class EditQuestion(generics.UpdateAPIView):
    permission_classes = [PostUserWritePermission]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class DeleteQuestion(generics.DestroyAPIView):
    permission_classes = [PostUserWritePermission]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class CreateComment(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


def comment_instance_to_list(comment):
    comment_dict = {'id': comment.id, 'content': comment.content, 'created': str(comment.created),
                    'upvote': comment.upvote, 'downvote': comment.down_vote}
    author = comment.author
    comment_dict['author'] = [author.id, author.first_name, str(author.image)]
    return comment_dict


@api_view()
@permission_classes([AllowAny])
def get_comments(request, question_id=None):
    comments = Comment.objects.filter(question=question_id, parent_comment=None).prefetch_related('comment_set')
    comment_dicts = []
    for comment in comments:
        comment_dict = comment_instance_to_list(comment)
        child_comments = comment.comment_set.all()
        list_child_comments = []
        for child_comment in child_comments:
            list_child_comment = comment_instance_to_list(child_comment)
            list_child_comments.append(list_child_comment)

        comment_dict['comment_set'] = list_child_comments
        comment_dicts.append(comment_dict)

    return Response({'data': comment_dicts})


@api_view()
@permission_classes([AllowAny])
def get_question(request, question_id=None):
    if not question_id:
        Response({"code": 400, "message": "Bad Request"})
    question = Question.objects.get(pk=question_id)
    if not question:
        Response({"code": 400, "message": "Bad Request"})
    question_data = {'id': question_id, 'content': question.content, 'title': question.title,
                     'numberComment': question.number_comment, 'comments': [],
                     'upvote': question.upvote,
                     'down_vote': question.down_vote,
                     'last_update': question.last_update, 'created_at': question.created}

    for comment in question.comment_set.all():
        author = comment.author
        question_data['comments'].append({
            'content': comment.content,
            'author': {'first_name': author.first_name,
                       'last_name': author.last_name,
                       'image': ''
                       },
            'confirmed': comment.confirmed,
            'last_update': str(comment.last_update),
            'created_at': str(comment.created),
            'upvote': comment.upvote,
            'downvote': comment.down_vote
        })
    return Response(question_data)

