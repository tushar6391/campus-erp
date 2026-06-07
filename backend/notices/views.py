from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Notice
from .serializers import NoticeSerializer

class NoticeListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        role = request.user.role
        # show notices targeted to user's role + notices for 'all'
        notices = Notice.objects.filter(
            target_role__in=['all', role]
        ).order_by('-created_at')
        serializer = NoticeSerializer(notices, many=True)
        return Response(serializer.data)