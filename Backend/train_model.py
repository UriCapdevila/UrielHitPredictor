import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# 1. Cargar los datos
try:
    df = pd.read_csv('dataset_spotify.csv')
    print("✅ Datos cargados correctamente.")
except FileNotFoundError:
    print("❌ Error: No se encuentra 'dataset_spotify.csv'. Ejecuta primero create_dataset.py")
    exit()

# 2. Seleccionar las columnas que usaremos para predecir (Features)
# Estas deben coincidir con lo que extrajimos de la API
features = ['danceability', 'energy', 'valence', 'tempo', 'acousticness', 'instrumentalness', 'speechiness', 'liveness']
target = 'is_hit' # 1 = Hit, 0 = No Hit

X = df[features]
y = df[target]

# 3. Separar datos: 80% para estudiar (Train), 20% para el examen (Test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Crear y Entrenar el Modelo (Random Forest)
# Es como un bosque de árboles de decisión votando
print("🧠 Entrenando el modelo...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 5. Evaluar qué tan bueno es
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"\n🎯 Precisión del modelo: {accuracy * 100:.2f}%")
print("\nReporte detallado:")
print(classification_report(y_test, y_pred))

# 6. Guardar el modelo entrenado
# Esto crea un archivo .pkl que es el "cerebro" portátil que usará tu FrontEnd
joblib.dump(model, 'spotify_model_v1.pkl')
print("💾 Modelo guardado como 'spotify_model_v1.pkl'")