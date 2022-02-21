from .db import db
from flask_login import UserMixin
from sqlalchemy.sql import func

class Booking(db.Model, UserMixin):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    place_id = db.Column(db.Integer, db.ForeignKey("places.id"), nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    guests = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, onupdate=func.now())


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'place_id': self.place_id,
            'date': self.date,
            'time': str(self.time),
            'duration': self.duration,
            'guests': self.guests,
            'place': self.places.to_dict()
        }


    user = db.relationship("User", back_populates="bookings")
    places = db.relationship("Place", back_populates="bookings")
