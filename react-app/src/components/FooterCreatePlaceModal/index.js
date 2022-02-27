import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePlaceForm from '../CreatePlaceModal/CreatePlaceForm';
import './FooterCreatePlaceModal.css'

function FooterCreatePlaceModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='create-listing-footer-button' onClick={() => setShowModal(true)}><span className='create-listing-footer-text'>Create a New Listing</span></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePlaceForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default FooterCreatePlaceModal;
