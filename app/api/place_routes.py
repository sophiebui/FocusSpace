from flask import Blueprint, request
from app.forms import DeletePlaceForm, PlaceForm
from app.models import Place, db

place_routes = Blueprint('places', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.capitalize()} : {error}')
    return errorMessages


@place_routes.route('/', methods=['POST', 'GET'])
def get_places():
    """
    Route for displaying all places
    """
    if request.method == 'POST':
        form = PlaceForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            user_id = form.data["user_id"]
            name = form.data['name']
            description = form.data['description']
            address = form.data['address']
            city = form.data['city']
            state = form.data['state']
            zip_code = form.data['zip_code']
            price = form.data['price']
            guests = form.data['guests']
            new_place = Place(user_id=user_id, name=name, description=description, address=address, city=city, state=state, zip_code=zip_code, price=price, guests=guests)
            db.session.add(new_place)
            db.session.commit()
            return new_place.to_dict()
        elif form.errors:
            print("form.errors", form.errors)
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
        places = Place.query.all()
        return {'places': [place.to_dict() for place in places]}


@place_routes.route('/<int:id>', methods=['PUT', 'GET'])
def get_one_place(id):
    """
    Route for getting specic place based on specific id
    """
    place = Place.query.get(id)
    if request.method == 'PUT':
        form = PlaceForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            user_id = form.data["user_id"]
            name = form.data['name']
            description = form.data['description']
            address = form.data['address']
            city = form.data['city']
            state = form.data['state']
            zip_code = form.data['zip_code']
            price = form.data['price']
            guests = form.data['guests']
            place.user_id = user_id
            place.name=name
            place.description=description
            place.address=address
            place.city=city
            place.state=state
            place.zip_code=zip_code
            place.price=price
            place.guests=guests
            db.session.add(place)
            db.session.commit()
            return place.to_dict()
        elif form.errors:
            print("form.errors", form.errors)
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    else:
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
        return place.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
