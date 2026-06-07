from django.urls import path
from .views import (
    FacultyProfileView,
    MarkAttendanceView,
    UploadAssignmentView,
    UploadResultView,
    CreateNoticeView,
)

urlpatterns = [
    path('profile/', FacultyProfileView.as_view(), name='faculty-profile'),
    path('attendance/mark/', MarkAttendanceView.as_view(), name='mark-attendance'),
    path('assignments/', UploadAssignmentView.as_view(), name='upload-assignment'),
    path('results/', UploadResultView.as_view(), name='upload-result'),
    path('notices/', CreateNoticeView.as_view(), name='create-notice'),
]