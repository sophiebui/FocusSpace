from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Length, EqualTo, NumberRange

class PlaceForm(FlaskForm):
    user_id = IntegerField("", validators={DataRequired()})
    name = StringField("name", validators=[DataRequired(), Length(min=2, max=64, message="Name must be within 2 to 64 characters")])
    description = StringField("description", validators=[Length(max=256, message="Description must be less than 256 characters")])
    address = StringField("address", validators={DataRequired()})
    city = StringField("city", validators={DataRequired()})
    state = StringField("state", validators={DataRequired()})
    zip_code = IntegerField("zipCode",  validators=[DataRequired(), NumberRange(min=5, message="Zip code must be 5 characters")])
    price = DecimalField("price: ", validators={DataRequired()})
    guests = IntegerField("guests: ", validators={DataRequired()})


class DeletePlaceForm(FlaskForm):
    place_id = IntegerField("", validators=[DataRequired()])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo('curr_user_id', message='You are not authorized to delete this listing')])
    place_user_id = IntegerField("", validators=[DataRequired(), EqualTo('place_user_id', message='You are not authorized to delete this listing')])
