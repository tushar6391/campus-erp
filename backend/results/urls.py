from django.urls import path
from .views import StudentResultView

urlpatterns = [
    path('', StudentResultView.as_view(), name='result-list'),
]