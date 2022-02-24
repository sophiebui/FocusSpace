from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TimeField
from wtforms.validators import DataRequired, ValidationError
import datetime

def validate_date(form, field):
    if field.data < datetime.date.today():
        raise ValidationError("The date cannot be in the past!")


class SearchForm(FlaskForm):
    location = StringField("", validators=[DataRequired()])
    date = DateField("date", validators=[DataRequired(), validate_date])
    time = TimeField("time", validators={DataRequired()})
    guests = IntegerField("", validators=[DataRequired()])
