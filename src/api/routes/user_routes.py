from flask import Blueprint, jsonify, request
from flask_cors import CORS
from ..models import User, db

user_bp = Blueprint('users', __name__, url_prefix='/users')

CORS(user_bp)

@user_bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()

    if not users:
        return jsonify({'msg': 'No hay ningun usuario registrado'}), 404

    return jsonify([u.serialize() for u in users]), 200

@user_bp.route('/<int:user_id>', methods=['GET'])
def show_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({'msg': 'No hay ningun usuario con esa referencia'}), 404

    return jsonify(user.serialize())

@user_bp.route('/', methods=['POST'])
def create_user():
    users = db.session.query(User).all()
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return jsonify({'msg': 'Rellena todos los datos atontao'}), 400
    
    for u in users:
        if u.email == data.get('email'):
            return jsonify({'error': 'Usuario ya existe'}), 409
    
    new_user = User(
        email= data['email'],
        password= data['password']
    )

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'Usuario creado', 'user': new_user.serialize()}), 200

@user_bp.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = db.session.get(User, user_id)
    data = request.get_json()

    if not user:
        return jsonify({'msg': 'No hay ningun usuario con esa referencia'}), 404

    
    user.email = data.get('email', user.email)

    db.session.commit()

    return jsonify({'msg': 'Usuario modificado'}, user.serialize()), 200
        
@user_bp.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = db.session.get(User, user_id)

    if not user:
        return jsonify({'msg': 'No hay ningun usuario con esa referencia'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'msg': 'Usuario eliminado'})