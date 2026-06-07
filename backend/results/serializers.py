from rest_framework import serializers
from .models import Result

class ResultSerializer(serializers.ModelSerializer):
    percentage = serializers.SerializerMethodField()

    class Meta:
        model  = Result
        fields = ['id','subject','marks','max_marks','grade','semester','percentage','uploaded_at']
        read_only_fields = ['percentage', 'uploaded_at']

    def get_percentage(self, obj):
        return round((obj.marks / obj.max_marks) * 100, 2)