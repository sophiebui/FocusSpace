import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePlaceForm from './DeletePlaceForm';


function DeletePlaceModal({place}) {
  const [showModal, setShowModal] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  }

  return (
    <>
    <button className='delete-place-button' onClick={() => setShowModal(true)}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePlaceForm setShowModal={setShowModal} place={place}  />
        </Modal>
      )}
    </>
  );
}

export default DeletePlaceModal;
