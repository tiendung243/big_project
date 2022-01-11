from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, getCurrentUser, editUser

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('', getCurrentUser, name='get_current_user'),
    path('edit', editUser, name="edit_user")
]