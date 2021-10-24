from django.urls import path
from django.conf import settings
from . import views

app_name = 'app'

urlpatterns = [
    path('', views.Test.as_view(), name="name"),
]
