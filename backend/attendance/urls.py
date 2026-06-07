from django.urls import path
from .views import StudentAttendanceView, AttendanceSummaryView

urlpatterns = [
    path('', StudentAttendanceView.as_view(), name='attendance-list'),
    path('summary/', AttendanceSummaryView.as_view(), name='attendance-summary'),
]