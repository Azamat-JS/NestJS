from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS
app = Flask(__name__)

CORS(app)
# Load ML model
with open('recommendation_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Load book dataset
books = pd.read_csv('books.csv')

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    book_id = data['bookId']

    # Get similar books
    similar_books = model[book_id].argsort()[-5:][::-1]
    recommended_books = books.iloc[similar_books][['bookId', 'title']].to_dict(orient='records')

    return jsonify(recommended_books)

if __name__ == '__main__':
    app.run(port=4001)
