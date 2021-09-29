from rest_framework import serializers

from .models import Document, Label, Annotation

class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = "__all__"
    # name = serializers.CharField(max_length=100)
    # color = serializers.CharField(max_length=6)


class AnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annotation
        fields = "__all__"
    # text = serializers.CharField()
    # start = serializers.IntegerField()
    # end = serializers.IntegerField()
    # label = LabelSerializer()

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"
    # document = serializers.CharField()