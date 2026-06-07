from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import CustomTokenSerializer
from .views import AdminStudentListView, AdminFacultyListView, AdminTimetableView

class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer

urlpatterns = [
    path('login/', CustomTokenView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/students/', AdminStudentListView.as_view(), name='admin-students'),
    path('admin/faculty/', AdminFacultyListView.as_view(), name='admin-faculty'),
    path('admin/timetable/', AdminTimetableView.as_view(), name='admin-timetable'),
]