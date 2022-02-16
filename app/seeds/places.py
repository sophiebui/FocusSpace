from app.models import db, Place


def seed_places():
    place1 = Place(
        user_id=1, name='Clean open space in the heart of downtown',
        description='Super clean & open space with a table that seats 6 people and mounted whiteboard. There is an additional area with seating up to 4 people.',
        address='900 Nicollet Mall', city='Minneapolis', state='MN', zip_code=55403, price=150, guests='10')
    place2 = Place(
        user_id=2, name='Modern conference space',
        description='Conference room located on the 2nd floor. Clean and quiet. Seats 8 people. Access to restrooms on same floor.',
        address='4316 N Miller Rd', city='Scottsdale', state='AZ', zip_code=85251, price=300, guests='8')
    place3 = Place(
        user_id=3, name='Large conference room - seats 20 people! ',
        description='Large conference desk that can seat up to 20 people. Easy access to outlets and restroom. Located in a quiet office space.  ',
        address='3850 Grand Way', city='St Louis Park', state='MN', zip_code=55416, price=350, guests='20')
    place4 = Place(
        user_id=4, name='Private room in coffee shop',
        description='Coffee + private space to focus. Need I say more? ',
        address='1765 E University Dr', city='Tempe', state='AZ', zip_code=85281, price=80, guests='6')
    place5 = Place(
        user_id=1, name='Single desk in upscale apartment',
        description='Quiet apartment with private office. Perfect for study time. Office has private restroom as well.',
        address='713 S Washington Ave', city='Minneapolis', state='MN', zip_code=55415, price=10, guests='1')



    db.session.add(place1)
    db.session.add(place2)
    db.session.add(place3)
    db.session.add(place4)
    db.session.add(place5)


    db.session.commit()


def undo_places():
    db.session.execute('TRUNCATE places RESTART IDENTITY CASCADE;')
    db.session.commit()
