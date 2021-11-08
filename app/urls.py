from django.urls import path, include
from .views import QuestionList, QuestionDetail, QuestionListDetailFilter, CreateQuestion, EditQuestion, DeleteQuestion \
    , get_comments
from rest_framework.routers import DefaultRouter

app_name = 'app'

urlpatterns = [
    path('', QuestionList.as_view(), name='list_latest_post'),
    path('search/', QuestionListDetailFilter.as_view(), name='post_search'),
    #     crud question
    path('post/<int:pk>/', QuestionDetail.as_view(), name='detail_post'),
    path('post/create/', CreateQuestion.as_view(), name='create_post'),
    path('post/edit/<int:pk>/', EditQuestion.as_view(), name='edit_post'),
    path('post/delete/<int:pk>/', DeleteQuestion.as_view(), name='delete_post'),
    path('comments/<int:question_id>/', get_comments)
]

""" Concrete View Classes
# CreateAPIView
Used for create-only endpoints.
# ListAPIView
Used for read-only endpoints to represent a collection of model instances.
# RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
# DestroyAPIView
Used for delete-only endpoints for a single model instance.
# UpdateAPIView
Used for update-only endpoints for a single model instance.
# ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
# RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
# RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""
