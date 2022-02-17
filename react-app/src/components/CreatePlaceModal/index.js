import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePlaceForm from './CreatePlaceForm';

function CreatePlaceModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='create-place-button' onClick={() => setShowModal(true)}>Create a New Listing</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePlaceForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default CreatePlaceModal;
