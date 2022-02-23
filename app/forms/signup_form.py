from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length, Regexp
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message="Username: This field is required"), Length(min=4, message="Username is a bit too short - must be more than 4 characters."), Length(max=40, message="Whoa that's a long username... Please keep it under 40 characters"), username_exists])
    email = StringField('email', validators=[DataRequired(message="Email: This field is required"), Email(), user_exists])
    password = StringField('password', validators=[DataRequired(message="Password: This field is required"), Regexp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$", message="Password must include: Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")])
    repeat_password = StringField('repeat_password', validators=[EqualTo('password', message="Passwords don't match")])
