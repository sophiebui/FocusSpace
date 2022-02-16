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
    place6 = Place(
        user_id=2, name='High floor office space',
        description='Clean professional office space that overlooks tempe town lake',
        address='1717 S Rural Rd', city='Tempe', state='AZ', zip_code=85202, price=200, guests='8')
    place7 = Place(
        user_id=3, name='Clean and modern studio apartment',
        description='A whole apartment to host meetings or a modern desk to host your virtual conferences',
        address='34 Snelling Ave N', city='St.Paul', state='MN', zip_code=55101, price=110, guests='5')
    place8 = Place(
        user_id=4, name='Lavish office space to host meetings and conferences',
        description='Cozey/Rustic studio apartment that can host up to 10 guests!',
        address='3421 E Broadway Blvd #191', city='Tucson', state='AZ', zip_code=85641, price=100, guests='10')
    place9 = Place(
        user_id=1, name='Top floor studio apartment',
        description='Modern apartment with marble table and portable whiteboard',
        address='2040 Cliff Rd #101', city='Eagen', state='MN', zip_code=55121, price=150, guests='6')
    place10 = Place(
        user_id=2, name='Professional office space',
        description='Spacious and professional office suite that is unoccupied by landlord.',
        address='550 E Willetta St,', city='Phoenix', state='AZ', zip_code=85005, price=160, guests='10')
    place11 = Place(
        user_id=3, name='Home office workspace',
        description='First floor home office space for collaboration and professional gatherings',
        address='1225 W Guadalupe Rd', city='Savage', state='MN', zip_code=55372, price=80, guests='6')
    place12 = Place(
        user_id=4, name='Guest house workspace',
        description='Vacant guest house used for professional development and collaboration',
        address='160 Coffee Pot Dr', city='Sedona', state='AZ', zip_code=86336, price=50, guests='4')
    place13 = Place(
        user_id=1, name='Simple, Clean, Aesthetically pleasing studio apartment',
        description='Cute and efficient workspace for personal and paired projects',
        address='1002 Woodland Ave', city='Duluth', state='MN', zip_code=55802, price=35, guests='3')
    place14 = Place(
        user_id=2, name='Modern college apartment',
        description='Spacious apartment held for gatherings for social movements and clubs',
        address='1485 E Florence Blvd Suite 6', city='Casa Grande', state='AZ', zip_code=85122, price=175, guests='9')
    place15 = Place(
        user_id=3, name='Professional office space',
        description='Vibrant office space that offers a standing desk, natural sunlight and plenty of breathing room',
        address='1872 Madison Ave', city='Mankato', state='MN', zip_code=56002, price=250, guests='8')
    place16 = Place(
        user_id=4, name='Vacant Office Suite',
        description='Professional office suite available for use since company is dissolved and not longer occupying',
        address='3731 S Arizona Ave', city='Chandler', state='AZ', zip_code=85286, price=210, guests='10')


    db.session.add(place1)
    db.session.add(place2)
    db.session.add(place3)
    db.session.add(place4)
    db.session.add(place5)
    db.session.add(place6)
    db.session.add(place7)
    db.session.add(place8)
    db.session.add(place9)
    db.session.add(place10)
    db.session.add(place11)
    db.session.add(place12)
    db.session.add(place13)
    db.session.add(place14)
    db.session.add(place15)
    db.session.add(place16)

    db.session.commit()


def undo_places():
    db.session.execute('TRUNCATE places RESTART IDENTITY CASCADE;')
    db.session.commit()
