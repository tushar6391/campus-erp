from django.db import models
from core.models import User

class Notice(models.Model):
    TARGET_CHOICES = [
        ('all', 'All'),
        ('student', 'Students Only'),
        ('faculty', 'Faculty Only'),
    ]

    created_by  = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notices')
    title       = models.CharField(max_length=200)
    content     = models.TextField()
    target_role = models.CharField(max_length=10, choices=TARGET_CHOICES, default='all')
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.target_role}"