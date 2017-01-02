from django.core.urlresolvers import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase


class PostsTests(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create(
            username='alisson',
            email='alissonpatricio@gmail.com',
            first_name='Alisson',
            last_name='Patricio'
        )
        self.user.set_password('test')
        self.user.save()

    def test_post_create_fail(self):
        url = reverse('posts:main')
        data = {
            'body': 'my first post',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_post_create(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('posts:main')
        data = {
            'body': 'my first post',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # test unauthenticated list
        self.client.force_authenticate(user=None)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
