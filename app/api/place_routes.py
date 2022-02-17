from flask import Blueprint, request
from app.forms.place_form import DeletePlaceForm
from app.models import Place, db

place_routes = Blueprint('places', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@place_routes.route('/', methods=['GET', 'PUT'])
def get_places():
    """
    Route for displaying all places
    """
    places = Place.query.all()
    print(places)
    return {'places': [place.to_dict() for place in places]}

@place_routes.route('/<int:id>', methods=['GET'])
def get_one_place(id):
    """
    Route for getting specic place based on specific id
    """
    place = Place.query.get(id)
    return place.to_dict()


@place_routes.route('/<int:id>', methods=['DELETE'])
def delete_place(id):
    """
    Route for getting a specifc place based on id then deletes it from the database.
    Returns 200 status if the place was deleted & 404 if the place does not exist
    """
    form = DeletePlaceForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        place = Place.query.get(id)
        db.session.delete(place)
        db.session.commit()
        return {}, 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
