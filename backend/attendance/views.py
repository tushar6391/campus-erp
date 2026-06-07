from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Attendance
from .serializers import AttendanceSerializer
from students.models import Student

class StudentAttendanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            student = Student.objects.get(user=request.user)
            records = Attendance.objects.filter(student=student)
            serializer = AttendanceSerializer(records, many=True)
            return Response(serializer.data)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=404)

class AttendanceSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            student = Student.objects.get(user=request.user)
            records = Attendance.objects.filter(student=student)

            summary = {}
            for record in records:
                subj = record.subject
                if subj not in summary:
                    summary[subj] = {'present': 0, 'total': 0}
                summary[subj]['total'] += 1
                if record.status == 'present':
                    summary[subj]['present'] += 1

            result = []
            for subj, data in summary.items():
                percentage = (data['present'] / data['total']) * 100
                result.append({
                    'subject': subj,
                    'present': data['present'],
                    'total': data['total'],
                    'percentage': round(percentage, 2)
                })

            return Response(result)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=404)