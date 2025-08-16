from flask import Blueprint, jsonify, request
from flask_cors import CORS
from ..models import Book, db, Author

book_bp = Blueprint('book', __name__, url_prefix='/book')

CORS(book_bp)

@book_bp.route('/',methods=['GET'])
def get_books():
    books = Book.query.all()

    if not books:
        return jsonify({'msg': 'No hay ningun libro registrado'}), 404
    
    return jsonify([b.serialize() for b in books]), 200

@book_bp.route('/<int:book_id>', methods=['GET'])
def get_book_id(book_id):
    book = Book.query.get(book_id)

    if not book:
        return jsonify({'msg': 'No hay ningun libro con esa referencia'}), 404
    
    return jsonify(book.serialize())

@book_bp.route('/', methods=['POST'])
def create_book():
    data = request.get_json()

    if not data.get('title') or not data.get('cover') or not data.get('description') or not data.get('author'):
        return jsonify({'msg': 'Rellena todos los campos atontao'}), 404
    
    author = Author.query.filter_by(name=data['author']).first()

    if not author:
        return jsonify({'msg': 'Autor no encontrado'}), 404
    
    new_book = Book(
        title = data['title'],
        cover = data['cover'],
        description = data['description'],
        author_id = author.id
    )

    db.session.add(new_book)
    db.session.commit()

    return jsonify({'msg': 'Libro registrado'}, new_book.serialize())

