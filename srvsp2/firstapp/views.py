from django.shortcuts import render #to redirect to template
from django.http import HttpResponse # to print html 
from .models import FirstDb # to connect with db from models
from django.db import connection # to write raw mysql queries
from django.http import JsonResponse

# Create your views here.

def index(request):
	return render(request,"firstapp/index.html")

def form_submit(request):
	print("successfully inserted")
	name = request.POST["name"]
	email = request.POST["email"]
	db_info = FirstDb(name=name,email=email)
	db_info.save()
	return render(request,"firstapp/header.html")

def details(response):
	return render(response,"firstapp/details.html")
def details1(response):
	cursor = connection.cursor()
	cursor.execute("select name from firstapp_firstdb where name='mahesh'")
	all_detais = cursor.fetchall()
	return JsonResponse({'status': all_detais})
