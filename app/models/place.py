from .db import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class Place(db.Model, UserMixin):
    __tablename__ = 'places'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    name = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(256), nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    guests = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'price': str(self.price),
            'guests': self.guests
        }


    user = db.relationship("User", back_populates="place")
    booking = db.relationship("Booking", back_populates="place", cascade="all, delete")
    review = db.relationship("Review", back_populates="place", cascade="all, delete")
    image = db.relationship("Image", back_populates="place", cascade="all, delete")
