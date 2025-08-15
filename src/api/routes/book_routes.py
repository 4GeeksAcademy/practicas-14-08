from flask import Blueprint, jsonify, request
from flask_cors import CORS
from ..models import Book, db

book_bp = Blueprint('book', __name__, url_prefix='/book')

CORS(book_bp)

