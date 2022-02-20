from flask import Blueprint, request
from app.forms import BookingForm, DeleteBookingForm
from app.models import Booking, db, Image

booking_routes = Blueprint('bookings', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.capitalize()} : {error}')
    return errorMessages

@booking_routes.route('/<int:user_id>', methods=['GET'])
def get_bookings(user_id):
    """
    Route for getting a user's bookings based on their userId
    """
    user_bookings = Booking.query.filter(Booking.user_id == user_id).all()
    return {'bookings': [booking.to_dict() for booking in user_bookings]}

@booking_routes.route('/<int:id>', methods=['POST'])
def new_booking(id):
    """
    Route for displaying all bookings
    """
    if request.method == 'POST':
        form = BookingForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            user_id = form.data["user_id"]
            place_id = form.data['place_id']
            date = form.data['date']
            time = form.data['time']
            duration = form.data['duration']
            guests = form.data['guests']
            new_booking = Booking(user_id=user_id, place_id=place_id, date=date, time=time, duration=duration, guests=guests)
            db.session.add(new_booking)
            db.session.commit()
            return new_booking.to_dict()
        elif form.errors:
            print("form.errors", form.errors)
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
