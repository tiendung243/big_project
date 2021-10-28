from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import generics
from .models import *

from .serializers import PostSerializer


class Test(TemplateView):
    template_name = "index.html"


class PostList(generics.ListCreateAPIView):
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer


class PostDetail(generics.RetrieveDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
