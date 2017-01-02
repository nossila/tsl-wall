First you need python 3 then:

Go to `wall/backend` directory and
```
$ pip install -r requirements.txt
$ python manage.py runserver
```
and go to http://127.0.0.1:8000/ it should be enough.

One thing:
* the welcome email will be printed on the console (using `django.core.mail.backends.console.EmailBackend`) since I didn't set a SMTP server.

If you'd like to run the frontend's development version go to `wall/frontend` directory and
```
$ npm install
$ webpack-dev-server
```
and you're good to go.
