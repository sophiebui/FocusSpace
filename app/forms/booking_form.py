from flask_wtf import FlaskForm
from wtforms import IntegerField, DateField, TimeField
from wtforms.validators import DataRequired, EqualTo, ValidationError
import datetime

def validate_date(form, field):
    if field.data < datetime.date.today():
        raise ValidationError("The date cannot be in the past!")

class BookingForm(FlaskForm):
    user_id = IntegerField("", validators={DataRequired()})
    place_id = IntegerField("", validators={DataRequired()})
    date = DateField("date", validators=[DataRequired(), validate_date])
    time = TimeField("time", validators={DataRequired()})
    duration = IntegerField("duration", validators={DataRequired()})
    guests = IntegerField("guests", validators={DataRequired()})


class DeleteBookingForm(FlaskForm):
    booking_id = IntegerField("", validators=[DataRequired()])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo('curr_user_id', message='You are not authorized to delete this listing')])
    booking_user_id = IntegerField("", validators=[DataRequired(), EqualTo('booking_user_id', message='You are not authorized to delete this listing')])
