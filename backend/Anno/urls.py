from . import views
from django.urls import  path

from rest_framework import routers
from .views import DocumentViewSet, AnnotationViewSet, LabelViewSet
router = routers.SimpleRouter()
router.register(r'documents', DocumentViewSet, basename='Document')
router.register(r'annotations', AnnotationViewSet, basename='Annotation')
router.register(r'labels', LabelViewSet, basename='Label')
urlpatterns = router.urls

# urlpatterns = [
#     path('', views.index, name='index'),
# ]

