from django.db import models
# Create your models here.


class Document(models.Model):
    document = models.TextField(default="")

class Label(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7)    

class Annotation(models.Model):
    text = models.TextField()
    start = models.IntegerField()
    end = models.IntegerField()
    label = models.ForeignKey(Label, on_delete=models.CASCADE)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, default=None)
    

