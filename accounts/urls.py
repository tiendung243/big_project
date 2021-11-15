from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, getCurrentUser

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('getinfo/', getCurrentUser, name='getCurrentUser'),
]