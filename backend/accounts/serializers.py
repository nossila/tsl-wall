from django.contrib.auth import get_user_model

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('email', 'username',
                  'first_name', 'last_name',)


class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'username',
                  'first_name', 'last_name',
                  'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        User = get_user_model()
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        subject = "Welcome to TLS's Wall"
        message = """Hi %(username)s, welcome to TSL's Wall.""" % {
            'username': user.username
        }
        user.email_user(subject, message)

        return user

    def validate_email(self, value):
        User = get_user_model()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                'Email already in use.'
            )
        return value
