from flask import Blueprint
from .user_routes import user_bp
from .book_routes import book_bp

api = Blueprint('api', __name__)

api.register_blueprint(user_bp)
api.register_blueprint(book_bp)




