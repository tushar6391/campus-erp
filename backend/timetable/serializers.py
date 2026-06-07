from rest_framework import serializers
from .models import Timetable

class TimetableSerializer(serializers.ModelSerializer):
    faculty_name = serializers.CharField(source='faculty.user.full_name', read_only=True)

    class Meta:
        model  = Timetable
        fields = ['id','department','year','day','subject','time_slot','faculty','faculty_name']
        extra_kwargs = {
            'faculty': {'required': False, 'allow_null': True}
        }