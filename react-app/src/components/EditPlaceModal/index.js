import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPlaceForm from './EditPlaceForm';

function EditPlaceModal({place, id}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='edit-place-button' onClick={() => setShowModal(true)}>Edit Listing</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPlaceForm setShowModal={setShowModal} place={place} id={id}/>
                </Modal>
            )}
        </>
    )
}

export default EditPlaceModal;
