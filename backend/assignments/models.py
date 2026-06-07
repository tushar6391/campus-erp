from django.db import models
from faculty.models import Faculty

class Assignment(models.Model):
    faculty     = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='assignments')
    subject     = models.CharField(max_length=100)
    title       = models.CharField(max_length=200)
    description = models.TextField()
    due_date    = models.DateField()
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.subject}"