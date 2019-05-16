# -*- coding: utf-8 -*-
from __future__ import unicode_literals


from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.db import connection
from django.conf import settings
from django.contrib.sessions.models import Session



# Create your views here..
def products(response):
	return render(response,"products.html")
def about(response):
	return render(response,"About.html")

def index(request):
	return render(request,'index.html')
	
def login(request):
	cursor=connection.cursor()
	if (request.POST):
		login_data = request.POST.dict()
		username = login_data.get("email")
		password = login_data.get("password")
		request.session['ss']=username
		ses_name = request.session['ss']
		sql_qry = "select username,password from admindata where username='"+username+"'"+"and password ='"+password+"'"	
		# print(sql_qry)
		cursor.execute(sql_qry)
		
		sql_qry_dropdown_list = "select mac_id from machine_list where user_name='"+username+"'"
		cursor.execute(sql_qry_dropdown_list)
		list1 = cursor.fetchall()
		list2=[];
		# print(list1[0])
		i=0
		while i < len(list1):
			print(list1[i][0])
			list2.append(list1[i][0])
			i=i+1

		

		print(list2)
		
		if cursor.rowcount > 0:
			# template = loader.get_template('machines.html')
			list3 = [1,2,3,4,5,60]
			return render(request,'machines.html',context = {'name':ses_name,'list1':list2,'list3':list3})
		return HttpResponse("rr")
		# users = []
		# passw =[]
		# for row in cursor:
		# 	users.append(row[0])
		# 	passw.append(row[1])
		# # print(users)
		# # print(passw)
		# columns = cursor.description
		# result = []
		# test = cursor.fetchall()
		# resu = zip(users,passw)
		# print(resu)
		# string_tuple_list = [list(map(str,eachTuple)) for eachTuple in resu]    #convert from unicode to string list
		# print (string_tuple_list)
def wheel(request):
	sql_wheel = "SELECT power FROM `Machine_update` ORDER BY `Machine_update`.`day` DESC limit 1"
	cursor=connection.cursor()
	cursor.execute(sql_wheel)
	result_wheel = cursor.fetchone()
	print(result_wheel)
	return JsonResponse({'power':result_wheel})

		
    	
  

