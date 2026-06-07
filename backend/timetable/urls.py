from django.urls import path
from .views import StudentTimetableView

urlpatterns = [
    path('', StudentTimetableView.as_view(), name='timetable-list'),
]