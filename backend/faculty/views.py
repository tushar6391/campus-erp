from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Faculty
from .serializers import FacultySerializer
from attendance.models import Attendance
from attendance.serializers import AttendanceSerializer
from assignments.models import Assignment
from assignments.serializers import AssignmentSerializer
from results.models import Result
from results.serializers import ResultSerializer
from notices.models import Notice
from notices.serializers import NoticeSerializer
from students.models import Student


class FacultyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            faculty = Faculty.objects.get(user=request.user)
            serializer = FacultySerializer(faculty)
            return Response(serializer.data)
        except Faculty.DoesNotExist:
            return Response({'error': 'Faculty not found'}, status=404)


class MarkAttendanceView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            faculty = Faculty.objects.get(user=request.user)
        except Faculty.DoesNotExist:
            return Response({'error': 'Faculty only'}, status=403)

        data = request.data  # expects list of {student_id, subject, date, status}
        created = []
        for item in data:
            try:
                student = Student.objects.get(id=item['student_id'])
                att, _ = Attendance.objects.update_or_create(
                    student=student,
                    subject=item['subject'],
                    date=item['date'],
                    defaults={
                        'status': item['status'],
                        'marked_by': faculty.user.full_name
                    }
                )
                created.append(AttendanceSerializer(att).data)
            except Student.DoesNotExist:
                continue
        return Response(created, status=201)


class UploadAssignmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            faculty = Faculty.objects.get(user=request.user)
        except Faculty.DoesNotExist:
            return Response({'error': 'Faculty only'}, status=403)

        serializer = AssignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(faculty=faculty)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class UploadResultView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            Faculty.objects.get(user=request.user)
        except Faculty.DoesNotExist:
            return Response({'error': 'Faculty only'}, status=403)

        student_id = request.data.get('student_id')
        try:
            student = Student.objects.get(id=student_id)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=404)

        serializer = ResultSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=student)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class CreateNoticeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = NoticeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)