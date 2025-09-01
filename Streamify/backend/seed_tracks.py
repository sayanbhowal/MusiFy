# Simple seed script to add a few public-domain/royalty-free sample tracks
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from music.models import Track

SAMPLES = [
    {
        "title": "Sunny Mornings",
        "artist": "Studio Jam",
        "album": "Royalty Free",
        "audio_url": "https://cdn.pixabay.com/download/audio/2021/09/16/audio_3d0cbe2e08.mp3?filename=corporate-uplifting-11253.mp3",
        "cover_url": "",
    },
    {
        "title": "Night Drive",
        "artist": "LoFi Labs",
        "album": "Beats",
        "audio_url": "https://cdn.pixabay.com/download/audio/2022/03/15/audio_5769b38a07.mp3?filename=lofi-study-112191.mp3",
        "cover_url": "",
    },
]

def run():
    for s in SAMPLES:
        Track.objects.get_or_create(
            title=s["title"],
            artist=s["artist"],
            album=s["album"],
            audio_url=s["audio_url"],
            cover_url=s["cover_url"],
        )
    print("Seeded tracks.")

if __name__ == "__main__":
    run()
