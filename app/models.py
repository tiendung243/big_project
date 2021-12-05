from django.db import models
from django.conf import settings
from django.utils import timezone

from ckeditor_uploader.fields import RichTextUploadingField


class Question(models.Model):
    class QuestionObject(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published')
    )

    title = models.CharField(max_length=250)
    excerpt = models.TextField(null=True)
    content = RichTextUploadingField()
    slug = models.SlugField(max_length=250, unique_for_date='created')
    created = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    status = models.CharField(max_length=10, choices=options, default='published')
    number_comment = models.IntegerField(default=0)
    view = models.IntegerField(default=0)
    upvote = models.IntegerField(default=0)
    down_vote = models.IntegerField(default=0)
    last_update = models.DateTimeField(default=timezone.now)
    number_bookmarked = models.IntegerField(default=0)
    number_comment = models.IntegerField(default=0)
    followed = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='follow_posts')

    objects = models.Manager()
    questionObjects = QuestionObject()

    class Meta:
        ordering = ('-created',)
        managed = True

    def __str__(self):
        return self.title


class Comment(models.Model):

    def __str__(self):
        return self.content

    question = models.ForeignKey(Question, on_delete=models.CASCADE, blank=True, null=True)
    content = RichTextUploadingField()
    created = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    upvote = models.IntegerField(default=0)
    down_vote = models.IntegerField(default=0)
    parent_comment = models.ForeignKey('Comment', on_delete=models.CASCADE, blank=True, null=True)
    confirmed = models.BooleanField(default=False)
    last_update = models.DateTimeField(default=timezone.now)
    followed = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='follow_comments')


class VoteQuestion(models.Model):
    options = (
        ('upvote', 'Upvote'),
        ('down_vote', 'Down Vote')
    )

    question = models.ForeignKey(Question, related_name='votes', blank=True, null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='vote_questions', blank=True, null=True,
                             on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=options, default='upvote')


class VoteComment(models.Model):
    options = (
        ('upvote', 'Upvote'),
        ('down_vote', 'Down Vote')
    )

    comment = models.ForeignKey(Comment, related_name='votes', blank=True, null=True, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='vote_comments', blank=True, null=True,
                             on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=options, default='upvote')


class Tag(models.Model):

    def __str__(self):
        return self.name

    name = models.CharField(unique=True, max_length=255)
    number_posts = models.IntegerField(default=0)
    questions = models.ManyToManyField(Question, related_name='tags', blank=True, null=True)
