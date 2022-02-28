from flask_wtf import FlaskForm
from wtforms import IntegerField, DateField, TimeField
from wtforms.validators import DataRequired, EqualTo, ValidationError, NumberRange
import datetime

def validate_date(form, field):
    if field.data < datetime.date.today():
        raise ValidationError("The date cannot be in the past!")

class BookingForm(FlaskForm):
    user_id = IntegerField("", validators={DataRequired()})
    place_id = IntegerField("", validators={DataRequired()})
    date = DateField("date", validators=[DataRequired(message="Date field is required"), validate_date])
    time = TimeField("time", validators={DataRequired(message="Time field is required")})
    duration = IntegerField("duration", validators=[DataRequired(), NumberRange(min=1, message="Duration must be 1 or more hours"), NumberRange(max=24, message="Duration cannot exceed 24 hours")])
    guests = IntegerField("guests: ", validators=[DataRequired(message="Number of guest cannot be blank"), NumberRange(min=1, message="Number of guests must be greater than 0"), NumberRange(max=2000, message="Number of guests must not exceed 2000")])


class DeleteBookingForm(FlaskForm):
    booking_id = IntegerField("", validators=[DataRequired()])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo('curr_user_id', message='You are not authorized to delete this listing')])
    booking_user_id = IntegerField("", validators=[DataRequired(), EqualTo('booking_user_id', message='You are not authorized to delete this listing')])
