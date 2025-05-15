import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import pickle

# Load data (Simulating PostgreSQL fetch)
interactions = pd.read_csv('user_interactions.csv')  # userId, bookId, interactionType
books = pd.read_csv('books.csv')  # bookId, title, category, author

# Convert interactions into a user-book matrix
interaction_matrix = interactions.pivot_table(index='userId', columns='bookId', aggfunc='size', fill_value=0)

# Calculate book similarity using Cosine Similarity
book_similarity = cosine_similarity(interaction_matrix.T)

# Save the model
with open('recommendation_model.pkl', 'wb') as f:
    pickle.dump(book_similarity, f)