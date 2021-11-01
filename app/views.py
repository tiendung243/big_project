from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import generics, viewsets
from .models import *
from rest_framework.permissions import AllowAny, SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .serializers import QuestionSerializer


class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only.'

    def has_object_permission(self, request, view, obj):
        # neu method la get list, get object thi co quyen
        # neu method la update thi check obj.author == user thi co quyen
        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class QuestionList(viewsets.ModelViewSet):
    permission_classes = [PostUserWritePermission]
    queryset = Question.questionObjects.all()
    serializer_class = QuestionSerializer

    def get_object(self, queryset=None, **kwargs):
        obj = self.kwargs.get('pk')
        return get_object_or_404(Question, slug=obj)

# class QuestionList(viewsets.ViewSet):
#     permission_classes = [AllowAny]
#     queryset = Question.questionObjects.all()
#
#     def list(self, request):
#         serializer_class = QuestionSerializer(self.queryset, many=True)
#         return Response(serializer_class.data)
#
#     def retrieve(self, request, pk=None):
#         question = get_object_or_404(self.queryset, pk=pk)
#         serializer_class = QuestionSerializer(question)
#         return Response(serializer_class.data)


class QuestionDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [PostUserWritePermission]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
