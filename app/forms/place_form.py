from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Length, EqualTo, NumberRange

class PlaceForm(FlaskForm):
    user_id = IntegerField("", validators={DataRequired()})
    name = StringField("Name: ", validators=[DataRequired(), Length(min=2, max=64, message="Name must be within 2 to 64 characters")])
    description = StringField("Description: ", validators=[Length(max=256, message="Description must be less than 256 characters")])
    address = StringField("Address: ", validators={DataRequired()})
    city = StringField("City: ", validators={DataRequired()})
    state = StringField("State: ", validators={DataRequired()})
    zip_code = IntegerField("Zip Code: ",  validators=[DataRequired(), NumberRange(min=5, message="Zip code must be 5 characters")])
    price = IntegerField("Price: ", validators={DataRequired()})
    guests = IntegerField("Address: ", validators={DataRequired()})
    submit = SubmitField("Submit")


class DeletePlaceForm(FlaskForm):
    place_id = IntegerField("", validators=[DataRequired()])
    curr_user_id = IntegerField("", validators=[DataRequired(), EqualTo('curr_user_id', message='You are not authorized to delete this listing')])
    place_user_id = IntegerField("", validators=[DataRequired(), EqualTo('place_user_id', message='You are not authorized to delete this listing')])
    submit = SubmitField("Submit")
