from django.urls import path
from .views import QuestionList, QuestionDetail
from rest_framework.routers import DefaultRouter

app_name = 'app'

router = DefaultRouter()
router.register('', QuestionList, basename='question')
urlpatterns = router.urls
# urlpatterns = [
#     path('<int:pk>/', QuestionDetail.as_view(), name='detailcreate'),
#     path('', QuestionList.as_view(), name='listcreate')
# ]
