from flask import Blueprint, jsonify, request
from flask_cors import CORS
from ..models import Book, db, Author, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

fav_bp = Blueprint('fav_books', __name__, url_prefix='/favorites')

CORS(fav_bp)

@fav_bp.route('/', methods=['GET'])
@jwt_required
def get_favs():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    

    if not user:
        return jsonify({'msg': 'El usuario no existe'}), 404
    
    fav_author = user.serialize()['fav_authors']
    fav_books = user.serialize()['fav_books']


    return jsonify({'books': fav_books,
                    'authors': fav_author}), 200

@fav_bp.route('/books/<int:book_id>', methods =['POST'])
@jwt_required
def add_book(book_id):
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    book = Book.query.get(book_id)

    if not user or not book:
        return jsonify({'msg': 'El usuario o libro no existe'}), 404
    
    if book in user.fav_books:
        return jsonify({'msg': 'El libro ya esta en favoritos'}), 404
    
    user.fav_books.append(book)
    db.session.commit()
    return jsonify({'msg': 'El libro ha sido añadido a favoritos'}), 201


@fav_bp.route('/books/<int:book_id>', methods =['DELETE'])
@jwt_required
def delete_book(user_id, book_id):
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    book = Book.query.get(book_id)

    if not user or not book:
        return jsonify({'msg': 'El usuario o libro no existe'}), 404
    
    if book not in user.fav_books:
        return jsonify({'msg': 'El libro no esta en favoritos'}), 404
    
    user.fav_books.remove(book)
    db.session.commit()
    return jsonify({'msg': 'El libro ha sido eliminado de favoritos'}), 200


@fav_bp.route('/author/<int:author_id>', methods =['POST'])
@jwt_required
def add_author(author_id):
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    author = Author.query.get(author_id)

    if not user or not author:
        return jsonify({'msg': 'El usuario o autor no existe'}), 404
    
    if author in user.fav_authors:
        return jsonify({'msg': 'El autor ya esta en favoritos'}), 404
    
    user.fav_authors.append(author)
    db.session.commit()
    return jsonify({'msg': 'El autor ha sido añadido a favoritos'}), 201

@fav_bp.route('/author/<int:author_id>', methods =['DELETE'])
@jwt_required
def delete_author(author_id):
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    author = Author.query.get(author_id)

    if not user or not author:
        return jsonify({'msg': 'El usuario o autor no existe'}), 404
    
    if author not in user.fav_authors:
        return jsonify({'msg': 'El autor no esta en tu lista de favoritos'}), 404
    
    user.fav_authors.remove(author)
    db.session.commit()
    return jsonify({'msg': 'El autor ha sido eliminado a favoritos'}), 201