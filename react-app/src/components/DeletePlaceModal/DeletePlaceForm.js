import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removePlace } from '../../store/places';
import { useHistory } from 'react-router-dom';

function DeletePlaceForm({place, setShowModal}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ , setErrors] = useState([]);
    const currUserId = useSelector(state => state.session.user.id);
    const currUserPlaceId = useSelector(state => state?.places[place.id]?.user_id);


    const submitDelete = (e) => {
        setErrors([]);
        const payload = {
            place_id: place.id,
            curr_user_id: currUserId,
            place_user_id: currUserPlaceId
        }

        return dispatch(removePlace(payload))
            .then(
                response => {
                    if (response?.errors) {
                        setErrors(response.errors)
                        return
                    }
                    history.push('/places')
                }
            )
    }

    return (
        <div className='delete'>
        <p className='delete-message'>Are you sure you want to remove this listing?</p>
        <p className='delete-note'>Please note: this action cannot be undone.</p>
        <div className='delete-button-div'>
            <button type='button' onClick={(e) => submitDelete()} className='delete-place-submit-button'>Yes</button>
            <button type='button' onClick={(e) => setShowModal(false)} className='delete-place-cancel-button'>Cancel</button>
        </div>
    </div>)
}

export default DeletePlaceForm
