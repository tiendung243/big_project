from django.db import models
from django.conf import settings
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Question(models.Model):

    class QuestionObject(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published')

    options = (
        ('draft', 'Draft'),
        ('published', 'Published')
    )

    category = models.ForeignKey(Category, on_delete=models.PROTECT, default=1)
    title = models.CharField(max_length=250)
    excerpt = models.TextField(null=True)
    content = models.TextField()
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
    content = models.TextField()
    created = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    upvote = models.IntegerField(default=0)
    down_vote = models.IntegerField(default=0)
    parent_comment = models.ForeignKey('Comment', on_delete=models.CASCADE, blank=True, null=True)
    confirmed = models.BooleanField(default=False)
    last_update = models.DateTimeField(default=timezone.now)


