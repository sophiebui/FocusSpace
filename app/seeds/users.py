from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    michael = User(
        username='Michael Scarn', email='micahel@email.com', password='password')
    samuel = User(
        username='Samuel L. Change', email='samuel@email.com', password='password')
    catherine = User(
        username='Catherine Zeta-Scarn', email='catherine@email.com', password='password')

    db.session.add(demo)
    db.session.add(michael)
    db.session.add(samuel)
    db.session.add(catherine)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
