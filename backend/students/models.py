from django.db import models
from core.models import User

class Student(models.Model):
    YEAR_CHOICES = [(1,'First'),(2,'Second'),(3,'Third'),(4,'Fourth')]

    user       = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    roll_no    = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=100)
    year       = models.IntegerField(choices=YEAR_CHOICES)
    semester   = models.IntegerField()
    phone      = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return f"{self.roll_no} - {self.user.full_name}"