from django.urls import path
from .views import (
    SignupView, LoginView, me_view,
    TrackListView, PlaylistListCreateView, search_view
)

urlpatterns = [
    path("auth/signup/", SignupView.as_view(), name="signup"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/me/", me_view, name="me"),
    path("tracks/", TrackListView.as_view(), name="tracks"),
    path("playlists/", PlaylistListCreateView.as_view(), name="playlists"),
    path("search/", search_view, name="search"),
]
