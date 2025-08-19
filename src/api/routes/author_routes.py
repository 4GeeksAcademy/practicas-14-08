from flask import Blueprint, jsonify, request
from flask_cors import CORS
from ..models import db, Author

author_bp = Blueprint('author', __name__, url_prefix='/author')
CORS(author_bp)


@author_bp.route('/', methods= ['GET'])
def get_authors():
    authors = Author.query.all()

    if not authors:
        return jsonify({'msg': 'No hay bningun author registrado'}), 404

    return jsonify([a.serialize() for a in authors]), 200

@author_bp.route('/<int:author_id>', methods= ['GET'])
def show_author(author_id):
    author = Author.query.get(author_id)

    if not author:
        return jsonify({'msg': 'No hay bningun author con esa referencia'}), 404

    return jsonify({'msg': 'Author enontrado'}, author.serialize()), 200

@author_bp.route('/', methods= ['POST'])
def create_author():
    data = request.get_json()

    if not data.get('name'):
        return jsonify({'msg': 'Rellena el campo del nombre'})
    
    new_author = Author(
        name = data['name']
    )

    db.session.add(new_author)
    db.session.commit()

    return jsonify({'msg': 'Autor regitrado'}, new_author.serialize()), 200

@author_bp.route('/<int:author_id>', methods= ['PUT'])
def upgrade_author(author_id):
    author = db.session.get(Author, author_id)
    data = request.get_json()

    if not author:
        return jsonify({'msg': 'No hay ningun author con esa referencia'}), 404

    author.name = data.get('name', author.name)

    db.session.commit()
    
    return jsonify({'msg': 'Author acualizado'}, author.serialize()), 200

@author_bp.route('/<int:author_id>', methods=['DELETE'])
def delete_author(author_id):
    author = db.session.get(Author, author_id)

    if not author:
        return jsonify({'msg': 'No hay ningun author con esa referencia'}), 404

    db.session.delete(author)
    db.session.commit()
    return jsonify({'msg': 'Author eliminado'})