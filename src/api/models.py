from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Table, Column, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from flask_bcrypt import generate_password_hash, check_password_hash
from typing import List

db = SQLAlchemy()

favorites_author = Table(
    'favorites_author',
    db.Model.metadata,
    Column('user_id', ForeignKey('users.id'), primary_key=True),
    Column('author_id', ForeignKey('authors.id'), primary_key=True)
)

favorites_books = Table(
    'favorites_books',
    db.Model.metadata,
    Column('user_id', ForeignKey('users.id'), primary_key=True),
    Column('books_id', ForeignKey('books.id'), primary_key=True)
)



class User(db.Model):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)

    fav_authors: Mapped[List['Author']] = relationship(secondary='favorites_author')
    fav_books: Mapped[List['Book']] = relationship(secondary='favorites_books')

    def set_password(self, password):
        self.password = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            'fav_authors': [a.serialize() for a in self.fav_authors],
            'fav_books': [b.serialize() for b in self.fav_books]
        }
    

class Author(db.Model):
    __tablename__ = 'authors'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)

    books: Mapped[List['Book']] = relationship(back_populates='author')

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            'books': [b.title for b in self.books]
        }
    

class Book(db.Model):
    __tablename__ = 'books'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    cover: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(String(255), nullable=False)

    author_id: Mapped[int] = mapped_column(ForeignKey('authors.id'))
    author: Mapped['Author'] = relationship(back_populates='books')

    def serialize(self):
        return {
            "id": self.id,
            "author_id": self.author_id,
            "title": self.title,
            "cover": self.cover,
            "description": self.description,
            "author": self.author.name if self.author else None
        }



