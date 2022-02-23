import { Modal } from '../../context/Modal';
import DeletePlaceForm from './DeletePlaceForm';
import {useStateIfMounted} from 'use-state-if-mounted'
import './DeletePlaceForm.css'
function DeletePlaceModal({place}) {
  const [showModal, setShowModal] = useStateIfMounted(false);

  const onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  }

  return (
    <>
    <button className='delete-place-button' onClick={onSubmit}>Delete</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeletePlaceForm setShowModal={setShowModal} place={place}  />
        </Modal>
      )}
    </>
  );
}

export default DeletePlaceModal;
