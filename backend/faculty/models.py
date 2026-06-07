from django.db import models
from core.models import User

class Faculty(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE, related_name='faculty_profile')
    employee_id = models.CharField(max_length=20, unique=True)
    department  = models.CharField(max_length=100)
    subject     = models.CharField(max_length=100)
    phone       = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return f"{self.employee_id} - {self.user.full_name}"