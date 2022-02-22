from flask import Blueprint, session
from app.models import Place

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



@search_routes.route('/<string:search_query>', methods=['GET'])
def main(search_query):
    """
    Route for searching for places that match query.
    """
    return ''
