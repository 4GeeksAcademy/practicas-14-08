from flask import Blueprint, jsonify, request
from flask_cors import CORS
from ..models import Book, db, Author

fav_books_bp = Blueprint('fav_books', __name__, url_prefix='/<int:user_id/favorites-books')