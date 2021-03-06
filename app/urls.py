from django.urls import path
from .views import DeleteQuestion, CommentDelete
from . import views

app_name = 'app'

urlpatterns = [
    path('', views.get_top_list_question, name='list_latest_post'),
    # path('search/', QuestionListDetailFilter.as_view(), name='post_search'),
    path('search/', views.PublisherDocumentView.as_view({'get': 'list'}), name='post_search'),
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
    path('user/post_owner', views.get_own_question, name='own_question'),
    path('user/post_following', views.get_following_question, name='own_question'),
]
