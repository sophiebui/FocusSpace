from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class DeleteImageForm(FlaskForm):
    id = IntegerField("", validators=[DataRequired()])
    place_id = IntegerField("", validators=[DataRequired()])
    url = StringField("", validators=[DataRequired()])
