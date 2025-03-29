from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import ScrapedData
from .serializers import ScrapedDataSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
import requests
from bs4 import BeautifulSoup
import json
from django.http import HttpResponse

from django.contrib.auth.models import User

def home(request):
    return HttpResponse("Hello from Django!")

class ScrapedDataViewSet(viewsets.ModelViewSet):
    queryset = ScrapedData.objects.all()
    serializer_class = ScrapedDataSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    permission_classes = [permissions.AllowAny]  # Allow any access

    @action(detail=False, methods=['post'])
    def scrape(self, request):
        url = request.data.get('url')
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.content, 'html.parser')
            data = soup.get_text()

            # Get or create a dummy user
            dummy_user, created = User.objects.get_or_create(
                username='dummy_user'
            )

            scraped_data = ScrapedData.objects.create(
                user=dummy_user,  # Associate with dummy user
                url=url,
                data=data
            )
            serializer = self.get_serializer(scraped_data)
            return Response(serializer.data, status=201)

        except Exception as e:
            return Response({'error': str(e)}, status=400)

