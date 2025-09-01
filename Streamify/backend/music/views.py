from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.db.models import Q
from .models import Track, Playlist
from .serializers import (
    UserSerializer, SignupSerializer, TrackSerializer, PlaylistSerializer
)

class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def me_view(request):
    return Response(UserSerializer(request.user).data)

class TrackListView(generics.ListAPIView):
    queryset = Track.objects.order_by("-created_at")
    serializer_class = TrackSerializer
    permission_classes = [permissions.AllowAny]

class PlaylistListCreateView(generics.ListCreateAPIView):
    serializer_class = PlaylistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Playlist.objects.filter(owner=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def search_view(request):
    q = request.GET.get("q", "").strip()
    qs = Track.objects.none()
    if q:
        qs = Track.objects.filter(
            Q(title__icontains=q) | Q(artist__icontains=q) | Q(album__icontains=q)
        ).order_by("-created_at")
    page = int(request.GET.get("page", 1))
    page_size = 20
    start = (page - 1) * page_size
    end = start + page_size
    serializer = TrackSerializer(qs[start:end], many=True)
    return Response({"results": serializer.data})
