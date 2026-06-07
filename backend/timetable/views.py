from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Timetable
from .serializers import TimetableSerializer
from students.models import Student

class StudentTimetableView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            student = Student.objects.get(user=request.user)
            timetable = Timetable.objects.filter(
                department=student.department,
                year=student.year
            )
            serializer = TimetableSerializer(timetable, many=True)
            return Response(serializer.data)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=404)