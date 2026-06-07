from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsAdmin
from students.models import Student
from students.serializers import StudentSerializer
from faculty.models import Faculty
from faculty.serializers import FacultySerializer
from timetable.models import Timetable
from timetable.serializers import TimetableSerializer
from .models import User


class AdminStudentListView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        students = Student.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        # create user + student profile together
        data = request.data
        try:
            user = User.objects.create_user(
                email=data['email'],
                password=data['password'],
                full_name=data['full_name'],
                role='student'
            )
            student = Student.objects.create(
                user=user,
                roll_no=data['roll_no'],
                department=data['department'],
                year=data['year'],
                semester=data['semester'],
                phone=data.get('phone', '')
            )
            return Response(StudentSerializer(student).data, status=201)
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class AdminFacultyListView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        faculty = Faculty.objects.all()
        serializer = FacultySerializer(faculty, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        try:
            user = User.objects.create_user(
                email=data['email'],
                password=data['password'],
                full_name=data['full_name'],
                role='faculty'
            )
            faculty = Faculty.objects.create(
                user=user,
                employee_id=data['employee_id'],
                department=data['department'],
                subject=data['subject'],
                phone=data.get('phone', '')
            )
            return Response(FacultySerializer(faculty).data, status=201)
        except Exception as e:
            return Response({'error': str(e)}, status=400)


class AdminTimetableView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        timetable = Timetable.objects.all()
        serializer = TimetableSerializer(timetable, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TimetableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)