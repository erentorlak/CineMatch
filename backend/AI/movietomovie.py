# movietomovie.py

import pandas as pd
#import torch
import joblib
from AI.NCFmodel import NCF  # Import the NCF class from the AI module
from pathlib import Path

def movie_to_movie(movieId):
    # BASE_DIR = Path(__file__).resolve().parent.parent

    # with open(str(BASE_DIR) + "\AI\movie_recommendation_model.pkl", "rb") as pkl_file:
    #     loaded_model = joblib.load(pkl_file)

    # similar_movies = loaded_model.recommend_similar_movies(movieId)
    return [64, 65, 66, 68, 69, 70, 71, 73, 74, 76]
    # return similar_movies
