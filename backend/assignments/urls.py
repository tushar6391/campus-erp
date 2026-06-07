from django.urls import path
from .views import StudentAssignmentView

urlpatterns = [
    path('', StudentAssignmentView.as_view(), name='assignment-list'),
]