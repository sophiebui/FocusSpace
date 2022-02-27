import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePlaceForm from '../CreatePlaceModal/CreatePlaceForm';
import './NavbarCreatePlaceModal.css'

function NavbarCreatePlaceModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='create-listing-nav-button' onClick={() => setShowModal(true)}><span className='create-listing-nav-text'>Create a New Listing</span></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreatePlaceForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}

export default NavbarCreatePlaceModal;
