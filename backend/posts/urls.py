from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.PostCreateListView.as_view(),
        name='main'),
]
