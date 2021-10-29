from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import generics
from .models import *

from .serializers import QuestionSerializer


class Test(TemplateView):
    template_name = "index.html"


class PostList(generics.ListCreateAPIView):
    queryset = Question.questionObjects.all()
    serializer_class = QuestionSerializer


class PostDetail(generics.RetrieveDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
