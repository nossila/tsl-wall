import base64
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase


def get_basic_auth_header(username, password):
    return 'Basic %s' % base64.b64encode(
        ('%s:%s' % (username, password)).encode('ascii')
    ).decode()


class AccountTests(APITestCase):
    def test_account_login_unsuccessful(self):
        self.client.credentials(
            HTTP_AUTHORIZATION=get_basic_auth_header(
                'usernamewilllogin', 'wrong'))
        response = self.client.post(reverse('accounts:login'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_account_register_successful(self):
        url = reverse('accounts:register')
        data = {
            'username': 'usernamewilllogin',
            'email': 'emailwilllogin@mydomain.com',
            'first_name': 'test',
            'last_name': 'user',
            'password': 'test12a'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Confirm user can login after register
        url_login = reverse('accounts:login')
        self.client.credentials(
            HTTP_AUTHORIZATION=get_basic_auth_header(
                'usernamewilllogin', 'test12a'))
        response_login = self.client.post(url_login, format='json')
        self.assertTrue('token' in response_login.data)
        self.assertEqual(response_login.status_code, status.HTTP_200_OK)
        self.client.credentials(
            HTTP_AUTHORIZATION='Token {}'.format(response_login.data['token']))

    def test_account_register_email_already_exists(self):
        url = reverse('accounts:register')
        data = {
            'username': 'emailsuccess',
            'email': 'emailsuccess@mydomain.com',
            'first_name': 'test',
            'last_name': 'user',
            'password': 'test12a'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Confirm user can login after register
        url_login = reverse('accounts:login')
        self.client.credentials(
            HTTP_AUTHORIZATION=get_basic_auth_header(
                'emailsuccess', 'test12a'))
        response_login = self.client.post(url_login, format='json')
        self.assertTrue('token' in response_login.data)
        self.assertEqual(response_login.status_code, status.HTTP_200_OK)

        url = reverse('accounts:register')
        data = {
            'username': 'emailsuccess',
            'email': 'emailsuccess@mydomain.com',
            'first_name': 'test',
            'last_name': 'user',
            'password': 'test12a'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['email'], ['Email already in use.'])
