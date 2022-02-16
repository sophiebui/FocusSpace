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
