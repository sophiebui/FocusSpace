from .db import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class Image(db.Model, UserMixin):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    place_id = db.Column(db.Integer, db.ForeignKey("places.id"), nullable=False)
    url = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'place_id': self.place_id,
            'url': self.url
        }


    place = db.relationship("Place", back_populates="images")
