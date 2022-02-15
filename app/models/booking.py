from .db import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class Booking(db.Model, UserMixin):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    place_id = db.Column(db.Integer, db.ForeignKey("places.id"), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    guests = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'place_id': self.place_id,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'guests': self.guests
        }


    user = db.relationship("User", back_populates="booking")
    place = db.relationship("Place", back_populates="booking")
