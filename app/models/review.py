from .db import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class Review(db.Model, UserMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    place_id = db.Column(db.Integer, db.ForeignKey("places.id"), nullable=False)
    review = db.Column(db.String(256))
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'place_id': self.place_id,
            'review': self.review,
            'rating': self.rating
        }


    user = db.relationship("User", back_populates="reviews")
    place = db.relationship("Place", back_populates="reviews")
