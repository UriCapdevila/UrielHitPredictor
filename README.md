# 🎵 HitPredictor | AI-Driven Music Analytics

![Status](https://img.shields.io/badge/Status-In%20Progress-yellow?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.9-blue?style=for-the-badge&logo=python)
![AWS](https://img.shields.io/badge/AWS-Cloud-orange?style=for-the-badge&logo=amazon-aws)
![Scikit-Learn](https://img.shields.io/badge/ML-Scikit--Learn-orange?style=for-the-badge&logo=scikitlearn)
![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)
![Pandas](https://img.shields.io/badge/Data-Pandas-150458?style=for-the-badge&logo=pandas)

> **Note:** This project is currently under active development. Features and architecture are subject to improvements as part of an ongoing Data Science specialization.

## 🚀 Project Overview

**HitPredictor** is a data intelligence tool designed to help emerging artists and record labels minimize investment risk. By analyzing audio features from the **Spotify API** (such as tempo, energy, danceability, and valence), the system predicts the potential "virality" or popularity score of a track before marketing budget is allocated.

### 🎯 The Business Problem
Independent artists often invest limited budgets in promoting singles without data-backed confidence. **HitPredictor** transforms subjective musical art into objective metrics to optimize decision-making and ROI (Return on Investment).

---

## 🏗️ Technical Architecture & Data Flow

This project implements a scalable **ETL (Extract, Transform, Load)** pipeline designed for cloud deployment.

### ☁️ Cloud Architecture (AWS Designed)
1.  **Ingestion:** Python scripts consume **Spotify Web API** to extract raw audio features.
2.  **Data Lake (Storage):** Raw JSON responses are stored in **AWS S3** buckets for historical tracking.
3.  **Processing (Serverless):** **AWS Lambda** functions trigger automatically to clean and normalize data using **Pandas**.
4.  **Storage:** Processed structured data is loaded into an **Amazon RDS (SQL)** database to ensure data integrity.
5.  **Machine Learning:** A **Scikit-Learn** classifier model assesses the track features against historical "Hit" patterns.

*(Note: The current repository contains the local development version of this architecture).*

---

## 🛠️ Tech Stack

### Data Science & Backend
* **Python 3.9**: Core logic and scripting.
* **Pandas & NumPy**: Data cleaning, handling missing values, and feature engineering.
* **Scikit-Learn**: Machine Learning implementation (Classification/Regression models).
* **Spotipy**: Lightweight Python library for the Spotify Web API.
* **SQL (PostgreSQL/MySQL)**: Structured data persistence.

### Frontend
* **React.js**: Interactive dashboard for artists to upload tracks and view predictions.
* **Chart.js**: Data visualization for audio feature comparison.

---

## 🧠 Machine Learning Approach

The core of HitPredictor relies on a supervised learning model.

1.  **Data Collection:** Dataset includes +10,000 tracks with popularity metrics.
2.  **Preprocessing:**
    * Handling `NULL` values.
    * Normalization of scalar features (0-1 range).
    * Outlier detection for skewed popularity metrics.
3.  **Model Training:**
    * Split data into **Train/Test** sets (80/20) to avoid overfitting.
    * Algorithm: **Random Forest Classifier** (chosen for its robustness with non-linear relationships in audio data).
4.  **Evaluation:** Model performance is tracked using Accuracy and F1-Score metrics.

---

## ⚡ How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/UriCapdevila/HitPredictor.git](https://github.com/UriCapdevila/HitPredictor.git)
    cd HitPredictor
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file with your Spotify credentials:
    ```env
    SPOTIPY_CLIENT_ID='your_client_id'
    SPOTIPY_CLIENT_SECRET='your_client_secret'
    ```

4.  **Run the ETL Script:**
    ```bash
    python src/etl_pipeline.py
    ```

---

## 🔮 Future Improvements
* **CI/CD Pipeline:** Implement GitHub Actions for automated testing and deployment to AWS.
* **Real-time Processing:** Integrate Amazon Kinesis for real-time streaming of new releases.
* **Containerization:** Dockerize the application for consistent deployment environments.

---

## 👨‍💻 Author

**Uriel Capdevila**
* *Data Science Student & Full Stack Developer*
* [LinkedIn](https://www.linkedin.com/in/uriel-capdevila0024/)
* [GitHub](https://github.com/UriCapdevila)

---
