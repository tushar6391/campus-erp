from django.db import models
from students.models import Student

class Result(models.Model):
    GRADE_CHOICES = [
        ('O', 'Outstanding'),
        ('A+', 'Excellent'),
        ('A', 'Very Good'),
        ('B+', 'Good'),
        ('B', 'Average'),
        ('F', 'Fail'),
    ]

    student      = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='results')
    subject      = models.CharField(max_length=100)
    marks        = models.IntegerField()
    max_marks    = models.IntegerField(default=100)
    grade        = models.CharField(max_length=5, choices=GRADE_CHOICES)
    semester     = models.IntegerField()
    uploaded_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['student', 'subject', 'semester']

    def __str__(self):
        return f"{self.student.roll_no} - {self.subject} - {self.grade}"