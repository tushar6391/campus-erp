from rest_framework import serializers
from .models import Faculty

class FacultySerializer(serializers.ModelSerializer):
    email     = serializers.EmailField(source='user.email', read_only=True)
    full_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model  = Faculty
        fields = ['id','email','full_name','employee_id','department','subject','phone']