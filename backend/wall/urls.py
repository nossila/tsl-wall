from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.views.static import serve

urlpatterns = [
    url(r'^api/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/posts/', include('posts.urls', namespace='posts')),
    url(r'^admin/', admin.site.urls),
    url(r'^$', serve, {'document_root': settings.FRONTEND_ROOT,
                       'path': '/index.html'}),
    url(r'^(?P<path>.*)$', serve, {'document_root': settings.FRONTEND_ROOT}),
]
