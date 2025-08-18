from flask import Blueprint, jsonify, request
from flask_cors import CORS
from ..models import User, db
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_bp = Blueprint('users', __name__, url_prefix='/users')

CORS(user_bp)

@user_bp.route('/signup', methods=['POST'])
def sign_up():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email y password requeridos'}), 400
    
    user_exist = db.session.execute(db.select(User).where(
        User.email == data['email']
    )).scalar_one_or_none()

    if user_exist:
        return jsonify({'message': 'El usuario ya existe'}), 400
    
    new_user = User(email= data['email'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuario creado'}), 200

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email y password requeridos'}), 400
    
    user = db.session.execute(db.select(User).where(
        User.email == email
    )).scalar_one_or_none()

    if user is None:
        return jsonify({'message': 'Email o password invalido'}), 400
    
    if user.check_password(password):
        token = create_access_token(str(user.id))
        return jsonify({'message': 'Usuario logeado correctamente', 'token': token}), 200
    else:
        return jsonify({'message': 'Email o password invalido'}), 400
    

@user_bp.route('/', methods=['GET'])
@jwt_required
def get_users():
    users = User.query.all()

    if not users:
        return jsonify({'msg': 'No hay ningun usuario registrado'}), 404

    return jsonify([u.serialize() for u in users]), 200


@user_bp.route('/', methods=['GET'])
@jwt_required
def show_user():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user:
        return jsonify({'msg': 'No hay ningun usuario con esa referencia'}), 404

    return jsonify(user.serialize())


@user_bp.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = db.session.get(User, user_id)
    data = request.get_json()

    if not user:
        return jsonify({'msg': 'No hay ningun usuario con esa referencia'}), 404

    
    user.email = data.get('email', user.email)

    db.session.commit()

    return jsonify({'msg': 'Usuario modificado'}, user.serialize()), 200
        
@user_bp.route('/', methods=['DELETE'])
@jwt_required
def delete_user():
    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))

    if not user:
        return jsonify({'msg': 'No hay ningun usuario con esa referencia'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'msg': 'Usuario eliminado'})