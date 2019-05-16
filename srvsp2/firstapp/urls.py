from django.conf.urls import url , include
from . import views

urlpatterns = [
	url(r'^$',views.index,name='index'),
	url(r'^form_submit/',views.form_submit,name='form_submit'),
	url(r'^details/',views.details,name='details'),
	url(r'^details1/$',views.details1,name='details1')
	
]