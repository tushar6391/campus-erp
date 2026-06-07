"""
URL configuration for campus_erp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('core.urls')),
    path('api/student/', include('students.urls')),
    path('api/student/attendance/', include('attendance.urls')),
    path('api/student/assignments/', include('assignments.urls')),
    path('api/student/results/', include('results.urls')),
    path('api/student/timetable/', include('timetable.urls')),
    path('api/notices/', include('notices.urls')),
    path('api/faculty/', include('faculty.urls')),
]
