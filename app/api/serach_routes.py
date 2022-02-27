from flask import Blueprint, request
from app.forms.search_form import SearchForm
from app.models import Place, Booking

search_routes = Blueprint('search', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.capitalize()} : {error}')
    return errorMessages

@search_routes.route('/<string:query>', methods=['POST'])
def get_search_results(query):
    """
    Route for displaying all places based on search query
    """
    form = SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = request.get_json()
        places_by_state = Place.query.filter(Place.state == data['location'], Place.guests >= data['guests']).all()
        places_with_bookings = Place.query.join(Booking).filter(
            Place.state == data['location'],
            Booking.date != data['date'] and Booking.time != data['time'],
            Place.guests >= data['guests']
        ).all()
        if (len(places_with_bookings) > 0):
            return {'places': [place.to_dict() for place in places_with_bookings]}
        else:
            return {'places': [place.to_dict() for place in places_by_state]}
    elif form.errors:
        print("form.errors", form.errors)
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    return 'No places available'
