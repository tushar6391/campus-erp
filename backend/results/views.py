from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Result
from .serializers import ResultSerializer
from students.models import Student

class StudentResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            student = Student.objects.get(user=request.user)
            semester = request.query_params.get('semester', None)

            results = Result.objects.filter(student=student)
            if semester:
                results = results.filter(semester=semester)

            serializer = ResultSerializer(results, many=True)
            return Response(serializer.data)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found'}, status=404)