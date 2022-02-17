from flask import Blueprint
from app.models import Place

place_routes = Blueprint('places', __name__)

@place_routes.route('/', methods=['GET', 'PUT'])
def get_places():
    """
    Route for displaying all places
    """
    places = Place.query.all()
    print(places)
    return {'places': [place.to_dict() for place in places]}

@place_routes.route('/<int:id>')
def get_one_place(id):
    """
    Route for getting specic place based on id
    """
    place = Place.query.get(id)
    return place.to_dict()
