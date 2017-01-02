from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               verbose_name=_('author'))
    body = models.TextField(_('body'))
    created_at = models.DateTimeField(_('created at'), default=timezone.now)
