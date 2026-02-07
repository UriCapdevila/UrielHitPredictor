from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

# 1. Inicializar la App
app = FastAPI()

# 2. Configurar CORS (Crucial para que React pueda hablar con Python)
# Esto permite que tu frontend (puerto 3000) mande datos al backend (puerto 8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción esto se cambia por la URL real
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Cargar el Modelo Entrenado
try:
    model = joblib.load('Backend/spotify_model_v1.pkl')
    print("✅ Modelo cargado correctamente.")
except:
    # Intento de respaldo por si lo corres desde dentro de la carpeta Backend
    try:
        model = joblib.load('spotify_model_v1.pkl')
        print("✅ Modelo cargado (ruta relativa).")
    except Exception as e:
        print(f"❌ Error cargando el modelo: {e}")

# 4. Definir qué datos esperamos recibir (El esquema)
class SongFeatures(BaseModel):
    danceability: float
    energy: float
    valence: float
    tempo: float
    acousticness: float
    instrumentalness: float
    speechiness: float
    liveness: float

@app.get("/")
def read_root():
    return {"message": "API de Predicción de Hits activa 🚀"}

@app.post("/predict")
def predict_hit(features: SongFeatures):
    # Convertir los datos recibidos a un formato que entienda el modelo (DataFrame)
    input_data = pd.DataFrame([features.dict()])
    
    # Hacer la predicción
    prediction = model.predict(input_data)[0] # 1 = Hit, 0 = No Hit
    probability = model.predict_proba(input_data)[0][1] # Probabilidad de ser Hit (0.0 a 1.0)
    
    result = "HIT MUNDIAL 🌟" if prediction == 1 else "Flop (No pegará) 📉"
    
    return {
        "prediction": int(prediction),
        "probability": float(probability),
        "result_text": result
    }