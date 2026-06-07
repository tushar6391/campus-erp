from rest_framework import serializers
from .models import Assignment

class AssignmentSerializer(serializers.ModelSerializer):
    faculty_name = serializers.CharField(source='faculty.user.full_name', read_only=True)

    class Meta:
        model  = Assignment
        fields = ['id','title','subject','description','due_date','created_at','faculty_name']
        read_only_fields = ['faculty_name', 'created_at']