# **App Name**: Spotify HitPredictor

## Core Features:

- Data Extraction: Extract audio features and metadata from Spotify API using the Spotipy library based on user input. Requires authentication with Spotify using client ID and secret.
- Model Training: Train a machine learning model (e.g., logistic regression, random forest) using scikit-learn to predict song popularity based on audio features.  The model should use engineered features and require a target variable, then be serialized with joblib.
- API Endpoint: Create a FastAPI endpoint to receive song features and return a popularity prediction. Integrate with the trained machine learning model for real-time predictions.
- Frontend Interface: Develop a React-based user interface where users can input song information or Spotify links to receive a popularity prediction.
- Prediction Display: Display the prediction result on the frontend in a clear, user-friendly format, including a confidence score or probability.

## Style Guidelines:

- Primary color: Deep violet (#673AB7) to evoke musicality and depth.
- Background color: Light lavender (#EDE7F6), a desaturated hue from the primary to ensure comfortable readability.
- Accent color: Electric purple (#BB86FC) for interactive elements and call-to-actions, analogous to the primary but brighter and more saturated.
- Body and headline font: 'Inter' (sans-serif) for a clean, modern, and readable interface.
- Use clean, minimalist icons to represent audio features and prediction results.
- A clean and modern layout with clear sections for input, prediction, and explanation.
- Subtle animations and transitions to provide feedback and enhance user experience.