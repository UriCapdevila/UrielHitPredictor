import requests
import base64
import time

# --- PONE TUS CREDENCIALES NUEVAS AQUÍ ---
CLIENT_ID = "1135c782300a4f3baf54ef550a985a1f"
CLIENT_SECRET = "45ebd2cf2f3a471daee32a0a88767e1c"

# 1. Obtener Token a mano (Para ver si la autenticación es el problema)
def get_token():
    auth_string = f"{CLIENT_ID}:{CLIENT_SECRET}"
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": f"Basic {auth_base64}",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    
    print("🔑 Intentando obtener Token...")
    result = requests.post(url, headers=headers, data=data)
    
    if result.status_code != 200:
        print(f"❌ FALLO AUTENTICACIÓN: {result.status_code}")
        print(result.json())
        exit()
    
    print("✅ Token generado correctamente.")
    return result.json()["access_token"]

# 2. Probar acceso a UNA canción (Bohemian Rhapsody - ID Global)
def test_one_track(token):
    track_id = "7tFiyTwD0nx5a1eklYtX2J" # ID universal
    url = f"https://api.spotify.com/v1/audio-features/{track_id}"
    
    headers = {"Authorization": f"Bearer {token}"}
    
    print(f"\n🎵 Consultando Audio Features para ID: {track_id}...")
    response = requests.get(url, headers=headers)
    
    print(f"📡 Estado HTTP: {response.status_code}")
    
    if response.status_code == 200:
        print("✅ ¡ÉXITO! Datos recibidos:")
        print(response.json())
    else:
        print("❌ ERROR CRÍTICO:")
        print(f"Cuerpo: {response.text}")
        print("Cabeceras (Headers) importantes:")
        if 'Retry-After' in response.headers:
            print(f"⏳ RETRY-AFTER: {response.headers['Retry-After']} segundos")
        if 'www-authenticate' in response.headers:
            print(f"🔐 AUTH INFO: {response.headers['www-authenticate']}")

if __name__ == "__main__":
    if CLIENT_ID == "TU_CLIENT_ID_NUEVO":
        print("⚠️ ERROR: No pusiste tus credenciales en el script debug_spotify.py")
    else:
        t = get_token()
        test_one_track(t)