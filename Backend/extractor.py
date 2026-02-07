import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd

# --- TUS CREDENCIALES ---
# Pega aquí tus códigos (¡No compartas este archivo con nadie!)
CLIENT_ID = '1135c782300a4f3baf54ef550a985a1f'
CLIENT_SECRET = '47b7831dbaaf41d8a594ec7e4b6dc947'

# 1. Autenticación con Spotify
try:
    client_credentials_manager = SpotifyClientCredentials(client_id=CLIENT_ID, client_secret=CLIENT_SECRET)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
    print("✅ Autenticación exitosa. Conectado a Spotify API.")
except Exception as e:
    print(f"❌ Error de autenticación: {e}")
    exit()

# 2. Probemos con una canción: "Despacito"
track_id = '4aWmUDTfIPGksMNLV2rQP2' 

# 3. Extraer las "features" (Características de audio)
print(f"🔍 Analizando canción ID: {track_id}...")
features = sp.audio_features(track_id)[0]

# 4. Mostrar el resultado
if features:
    print("\n--- RESULTADOS DEL ANÁLISIS ---")
    print(f"💃 Danceability: {features['danceability']} (0.0 a 1.0)")
    print(f"⚡ Energy:       {features['energy']} (0.0 a 1.0)")
    print(f"😃 Valence:      {features['valence']} (Qué tan positiva suena)")
    print(f"⏱️ Tempo:        {features['tempo']} BPM")
    print("-------------------------------")
    print("¡Funciona! Tu sistema ya sabe 'escuchar' datos.")
else:
    print("❌ No se pudieron extraer las características.")