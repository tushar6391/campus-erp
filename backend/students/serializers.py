from rest_framework import serializers
from .models import Student
from core.models import User

class StudentSerializer(serializers.ModelSerializer):
    email     = serializers.EmailField(source='user.email', read_only=True)
    full_name = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model  = Student
        fields = ['id','email','full_name','roll_no','department','year','semester','phone']