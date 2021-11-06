from rest_framework import serializers
from .models import Question, Comment


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'title', 'author', 'slug', 'excerpt', 'content', 'category')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'content', 'author', 'parent_comment', 'question', 'upvote', 'down_vote')
