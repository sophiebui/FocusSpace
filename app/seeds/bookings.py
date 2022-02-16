from app.models import db, Booking


def seed_bookings():
    booking1 = Booking(user_id=1, place_id=3, date='2022-02-28', time='14:30', duration=3, guests=18)
    booking2 = Booking(user_id=1, place_id=8, date='2022-05-12', time='13:00', duration=2, guests=8)
    booking3 = Booking(user_id=2, place_id=13, date='2022-03-11', time='10:00', duration=6, guests=1)
    booking4 = Booking(user_id=2, place_id=15, date='2022-02-25', time='8:00', duration=8, guests=1)
    booking5 = Booking(user_id=3, place_id=16, date='2022-02-28', time='18:00', duration=2, guests=1)
    booking6 = Booking(user_id=3, place_id=9, date='2022-04-05', time='9:00', duration=3, guests=4)
    booking7 = Booking(user_id=4, place_id=1, date='2022-04-24', time='7:30', duration=8, guests=3)
    booking8 = Booking(user_id=4, place_id=11, date='2022-06-22', time='11:00', duration=1, guests=2)


    db.session.add(booking1)
    db.session.add(booking2)
    db.session.add(booking3)
    db.session.add(booking4)
    db.session.add(booking5)
    db.session.add(booking6)
    db.session.add(booking7)
    db.session.add(booking8)


    db.session.commit()


def undo_bookings():
    db.session.execute('TRUNCATE bookings RESTART IDENTITY CASCADE;')
    db.session.commit()
