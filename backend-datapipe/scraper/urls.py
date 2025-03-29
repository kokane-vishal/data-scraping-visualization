from django.urls import path, include
from rest_framework import routers
from scraper import views

router = routers.DefaultRouter()
router.register(r'scrapeddata', views.ScrapedDataViewSet, basename='scrapeddata')

urlpatterns = [
    path('', include(router.urls)),
    path('', views.home, name='home'),
]