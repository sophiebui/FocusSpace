from ast import Num
from tokenize import Number
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, FileField
from wtforms.validators import DataRequired, Length, EqualTo, NumberRange, ValidationError
import re

def validate_zip_code(form, field):
    pattern = re.compile(r"^\d{5}$")
    if len(str(field.data)) != 5:
        raise ValidationError("Zip code must be 5 characters")
    elif not re.fullmatch(pattern, field.data):
        raise ValidationError("Must only include numeric values")

class PlaceForm(FlaskForm):
    user_id = IntegerField("", validators={DataRequired()})
    name = StringField("name", validators=[DataRequired(message="Name field is required"), Length(min=2, max=64, message="Name must be within 2 to 64 characters")])
    description = StringField("description", validators=[Length(max=256, message="Description must be less than 256 characters")])
    address = StringField("address", validators={DataRequired(message="Address cannot be blank")})
    city = StringField("city", validators={DataRequired(message="City cannot be blank")})
    state = StringField("state", validators={DataRequired(message="State cannot be blank")})
    zip_code = StringField("zipCode",  validators=[DataRequired(message="Zip code cannot be blank"),  validate_zip_code])
    price = DecimalField("price: ", validators=[DataRequired(message="Price cannot be blank"), NumberRange(min=1, message="Price cannot be less than 0")])
    guests = IntegerField("guests: ", validators=[DataRequired(message="Number of guest cannot be blank"), NumberRange(min=1, message="Max occupancy must be greater than 0")])
    images = FileField("images", validators={DataRequired(message="Image cannot be blank")})

class DeletePlaceForm(FlaskForm):
    place_id = IntegerField("", validators=[DataRequired()])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo('curr_user_id', message='You are not authorized to delete this listing')])
    place_user_id = IntegerField("", validators=[DataRequired(), EqualTo('place_user_id', message='You are not authorized to delete this listing')])
