from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from rest_framework.generics import ListAPIView
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import UpdateAPIView


from .serializers import DocumentSerializer, LabelSerializer, AnnotationSerializer
from .models import Document, Label, Annotation

# # Document Views

# class ListDocumentAPIView(ListAPIView):
#     """This endpoint list all of the available Documents from the database"""
#     queryset = Document.objects.all()
#     serializer_class = DocumentSerializer

# class CreateDocumentAPIView(CreateAPIView):
#     """This endpoint allows for creation of a Document"""
#     queryset = Document.objects.all()
#     serializer_class = DocumentSerializer

# class UpdateDocumentAPIView(UpdateAPIView):
#     """This endpoint allows for updating a specific Document by passing in the id of the Document to update"""
#     queryset = Document.objects.all()
#     serializer_class = DocumentSerializer

# class DeleteDocumentAPIView(DestroyAPIView):
#     """This endpoint allows for deletion of a specific Document from the database"""
#     queryset = Document.objects.all()
#     serializer_class = DocumentSerializer

# # Label Views

# class ListLabelAPIView(ListAPIView):
#     """This endpoint list all of the available Labels from the database"""
#     queryset = Label.objects.all()
#     serializer_class = LabelSerializer

# class CreateLabelAPIView(CreateAPIView):
#     """This endpoint allows for creation of a Label"""
#     queryset = Label.objects.all()
#     serializer_class = LabelSerializer

# class UpdateLabelAPIView(UpdateAPIView):
#     """This endpoint allows for updating a specific Label by passing in the id of the Label to update"""
#     queryset = Label.objects.all()
#     serializer_class = LabelSerializer

# class DeleteLabelAPIView(DestroyAPIView):
#     """This endpoint allows for deletion of a specific Label from the database"""
#     queryset = Label.objects.all()
#     serializer_class = LabelSerializer

# # Annotation Views

# class ListAnnotationAPIView(ListAPIView):
#     """This endpoint list all of the available Annotations from the database"""
#     queryset = Annotation.objects.all()
#     serializer_class = AnnotationSerializer

# class CreateAnnotationAPIView(CreateAPIView):
#     """This endpoint allows for creation of a Annotation"""
#     queryset = Annotation.objects.all()
#     serializer_class = AnnotationSerializer

# class UpdateAnnotationAPIView(UpdateAPIView):
#     """This endpoint allows for updating a specific Annotation by passing in the id of the Annotation to update"""
#     queryset = Annotation.objects.all()
#     serializer_class = AnnotationSerializer

# class DeleteAnnotationAPIView(DestroyAPIView):
#     """This endpoint allows for deletion of a specific Annotation from the database"""
#     queryset = Annotation.objects.all()
#     serializer_class = AnnotationSerializer


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer  


class AnnotationViewSet(viewsets.ModelViewSet):
    queryset = Annotation.objects.all()
    serializer_class = AnnotationSerializer  


class LabelViewSet(viewsets.ModelViewSet):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer  

        
def index(request):
    return HttpResponse("Hello, world. You're at the Anno index.")