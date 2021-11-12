from rest_framework import serializers
from .models import Question, Comment
from accounts.models import AuthUser


class QuestionSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(
        queryset=AuthUser.objects.all(),  # Or User.objects.filter(active=True)
        required=False,
        allow_null=True,
        default=None
    )

    # Get the current user from request context
    def validate_author(self, value):
        return self.context['request'].user

    class Meta:
        model = Question
        fields = ('id', 'title', 'author', 'slug', 'excerpt', 'content', 'category')


class CommentSerializer(serializers.ModelSerializer):

    author = serializers.PrimaryKeyRelatedField(
        queryset=AuthUser.objects.all(),  # Or User.objects.filter(active=True)
        required=False,
        allow_null=True,
        default=None
    )

    # Get the current user from request context
    def validate_author(self, value):
        return self.context['request'].user

    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'parent_comment', 'question', 'upvote', 'down_vote')
