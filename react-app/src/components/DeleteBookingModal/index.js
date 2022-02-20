import { Modal } from '../../context/Modal';
import DeleteBookingForm from './DeleteBookingForm';
import {useStateIfMounted} from 'use-state-if-mounted'

function DeleteBookingModal({booking}) {
  const [showModal, setShowModal] = useStateIfMounted(false);

  const onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  }

  return (
    <>
    <button className='delete-booking-button' onClick={onSubmit}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteBookingForm setShowModal={setShowModal} booking={booking}  />
        </Modal>
      )}
    </>
  );
}

export default DeleteBookingModal;
