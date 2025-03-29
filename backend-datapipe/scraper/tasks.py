from celery import shared_task
from bs4 import BeautifulSoup
import requests
from .models import ScrapedData
from django.contrib.auth.models import User

@shared_task
def scrape_url(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        data = soup.get_text()

        # Assuming you have a user to associate the data with (e.g., a system user)
        # You might need to adjust this based on how you want to handle users in scheduled tasks
        system_user = User.objects.first()  # Get the first user or create a system user

        ScrapedData.objects.create(
            user=system_user,
            url=url,
            data=data
        )
        print(f"Scraped data from {url} and saved.")
    except Exception as e:
        print(f"Error scraping {url}: {e}")