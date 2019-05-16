from django.conf.urls import url , include
from . import views

urlpatterns = [
	url(r'^$',views.index,name='index'),
	url(r'^about/', views.about, name='about'),
	url(r'^products/', views.products, name='products'),
	url(r'^login', views.login, name='login'),
	url(r'^wheel', views.wheel, name='wheel'),
]