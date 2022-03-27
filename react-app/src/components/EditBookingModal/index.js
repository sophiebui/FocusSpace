import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditBookingForm from './EditBookingForm';

function EditBookingModal({booking}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='edit-place-button' onClick={() => setShowModal(true)}>Edit Booking</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditBookingForm setShowModal={setShowModal} booking={booking}/>
                </Modal>
            )}
        </>
    )
}

export default EditBookingModal;
