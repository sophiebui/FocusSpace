from app.models import db, Review


def seed_reviews():
    review1_1 = Review(user_id=1, place_id=3, review='', rating='1')
    review1_2 = Review(user_id=1, place_id=8, review='', rating='1')
    review2_1 = Review(user_id=2, place_id=13, review='', rating='1')
    review2_2 = Review(user_id=2, place_id=15, review='', rating='1')
    review3_1 = Review(user_id=3, place_id=16, review='', rating='1')
    review3_2 = Review(user_id=3, place_id=9, review='', rating='1')
    review4_1 = Review(user_id=4, place_id=1, review='', rating='1')
    review4_2 = Review(user_id=4, place_id=11, review='', rating='1')


    db.session.add(review1_1)
    db.session.add(review1_2)
    db.session.add(review2_1)
    db.session.add(review2_2)
    db.session.add(review3_1)
    db.session.add(review3_2)
    db.session.add(review4_1)
    db.session.add(review4_2)

    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
