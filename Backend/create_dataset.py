import pandas as pd
import random
import time

# Listas falsas para dar realismo visual
artists = ['Bad Bunny', 'Duki', 'Taylor Swift', 'The Weeknd', 'Emilia', 'Bizarrap', 'Drake', 'Karol G', 'Harry Styles', 'Rosalia']
hit_words = ['Love', 'Night', 'Baila', 'Corazon', 'Yeah', 'Summer', 'Party', 'Baby', 'Loca', 'Vida']
flop_words = ['Symphony', 'Concerto', 'Interlude', 'Study', 'Noise', 'Abstract', 'Concept', 'Demo', 'Intro', 'Sleep']

def generate_dummy_data():
    print("🧪 Iniciando Generador de Datos Sintéticos (Modo Emergencia)...")
    
    data = []
    
    # Generamos 200 canciones simuladas
    for i in range(200):
        # Aleatoriedad controlada
        is_hit_simulation = random.choice([0, 1])
        
        if is_hit_simulation == 1:
            # SIMULAMOS UN HIT: Alta energía y bailabilidad
            danceability = random.uniform(0.7, 0.99)
            energy = random.uniform(0.7, 0.99)
            valence = random.uniform(0.5, 0.95) # Feliz
            acousticness = random.uniform(0.0, 0.3)
            popularity = random.randint(75, 100)
            name = f"{random.choice(hit_words)} {random.choice(hit_words)}"
        else:
            # SIMULAMOS NO-HIT: Lento, acústico o triste
            danceability = random.uniform(0.1, 0.5)
            energy = random.uniform(0.1, 0.5)
            valence = random.uniform(0.0, 0.4) # Triste
            acousticness = random.uniform(0.6, 0.99)
            popularity = random.randint(0, 40)
            name = f"{random.choice(flop_words)} {random.choice(flop_words)}"

        # Resto de features random
        track = {
            'name': name,
            'artist': random.choice(artists),
            'popularity': popularity,
            'is_hit': is_hit_simulation,
            'danceability': danceability,
            'energy': energy,
            'valence': valence,
            'tempo': random.uniform(80, 160),
            'acousticness': acousticness,
            'instrumentalness': random.uniform(0, 0.5),
            'speechiness': random.uniform(0, 0.2),
            'liveness': random.uniform(0, 0.3)
        }
        data.append(track)

    # Crear DataFrame
    df = pd.DataFrame(data)
    
    # Guardar
    df.to_csv('dataset_spotify.csv', index=False)
    print(f"\n✅ ¡LISTO! Dataset de emergencia generado con {len(df)} canciones.")
    print("📊 Distribución:")
    print(df['is_hit'].value_counts())
    print("\n👉 AHORA: Ejecuta 'python Backend/train_model.py' para entrenar tu IA.")

if __name__ == '__main__':
    generate_dummy_data()