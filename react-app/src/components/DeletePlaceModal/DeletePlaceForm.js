import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import removePlace from "../../store/places";
import { useHistory } from 'react-router-dom';




function DeletePlaceForm({place, setShowModal}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ , setErrors] = useState([]);
    const [success, setSuccess] = useState("");
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
                    if (response.errors) {
                        setErrors(response.errors)
                        return
                    }
                    setSuccess("Success");
                    setTimeout(() => {
                        setShowModal(false);
                    }, 1500);
                    history.push('/places')
                }
            )
    }

    return (
        <div className='delete'>
        <h2>Are you sure you want to delete this place?</h2>
        <h3 style={{color:"black"}} >This cannot be undone.</h3>
        <button type="button" onClick={(e) => submitDelete()} className='delete-submit-button'>Yes</button>
        <button type="button" onClick={(e) => setShowModal(false)} className='delete-cancel-button'>No</button>
        <h2 style={{color:"green"}}>{success}</h2>
    </div>)
}

export default DeletePlaceForm
