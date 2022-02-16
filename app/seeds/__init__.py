import imp
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .places import seed_places, undo_places
from .bookings import seed_bookings, undo_bookings
from .images import seed_images, undo_images
from .reviews import seed_reviews, undo_reviews
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_places()
    seed_bookings()
    seed_images()
    seed_reviews()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_reviews()
    undo_images()
    undo_bookings()
    undo_places()
    undo_users()
    # Add other undo functions here
