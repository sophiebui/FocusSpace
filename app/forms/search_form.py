from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TimeField
from wtforms.validators import DataRequired, ValidationError, NumberRange
import datetime

def validate_date(form, field):
    if field.data < datetime.date.today():
        raise ValidationError("The date cannot be in the past!")


class SearchForm(FlaskForm):
    location = StringField("", validators=[DataRequired()])
    date = DateField("date", validators=[DataRequired(message="Date field is required"), validate_date])
    time = TimeField("time", validators={DataRequired(message="Time field is required")})
    guests = IntegerField("guests: ", validators=[DataRequired(message="Number of guest cannot be blank"), NumberRange(min=1, message="Number of guests must be greater than 0"), NumberRange(max=2000, message="Number of guests must not exceed 2000")])
