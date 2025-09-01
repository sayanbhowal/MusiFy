from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Track, Playlist

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email"),
            password=validated_data["password"],
        )
        return user

class TrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Track
        fields = ["id", "title", "artist", "album", "audio_url", "cover_url"]

class PlaylistSerializer(serializers.ModelSerializer):
    tracks = TrackSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = ["id", "name", "owner", "tracks"]
        read_only_fields = ["owner"]
