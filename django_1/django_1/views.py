from django.http import *
from django.shortcuts import render
from django.conf import settings

def home(request):
	settings.DATABASES['default']['NAME']='ddd'
	dbHost=settings.DATABASES['default']['NAME']
	
	print len(settings.DATABASES)	
	return render(request,"home.html")