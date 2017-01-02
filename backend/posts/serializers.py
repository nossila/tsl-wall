from rest_framework import serializers
from .models import Post
from accounts.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'author', 'body', 'created_at')
        read_only_fields = ('id', 'author', 'created_at')
        depth = 1

    def create(self, validated_data):
        return Post(**validated_data)
