from django.urls import path, include
from .views import QuestionListDetailFilter, DeleteQuestion, CommentDelete
from . import views

app_name = 'app'

urlpatterns = [
    path('', views.get_top_list_question, name='list_latest_post'),
    path('search/', QuestionListDetailFilter.as_view(), name='post_search'),
    #     crud question
    path('post/<int:question_id>/', views.get_question),
    path('post/create/', views.create_question, name='create_post'),
    path('post/edit/<int:pk>/', views.edit_question, name='edit_post'),
    path('post/delete/<int:pk>/', DeleteQuestion.as_view(), name='delete_post'),
    path('post/vote', views.vote_post, name='vote_post'),
    # path('comments/<int:question_id>/', get_comments),

    # crud comment
    path('comment/create/', views.create_comment, name='create_post'),
    path('comment/edit/<int:pk>/', views.edit_comment, name='create_post'),
    path('comment/delete/<int:pk>/', CommentDelete.as_view(), name='delete_comment'),
    path('comment/vote', views.vote_comment, name='vote_comment'),
    path('post/follow', views.follow_post, name='follow_post'),
    path('comment/follow', views.follow_comment, name='follow_comment'),
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
