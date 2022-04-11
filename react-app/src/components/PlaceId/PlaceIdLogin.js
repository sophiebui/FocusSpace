import { Modal } from '../../context/Modal';
import {useStateIfMounted} from 'use-state-if-mounted'
import LoginForm from '../LoginForm';
import './PlaceId.css'

function PlaceIdLogin({setLoginModal}) {
  const [showModal, setShowModal] = useStateIfMounted(false);

  const onSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  }

  return (
    <>
    <button className='place-id-login' onClick={onSubmit}>log in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm setShowModal={setShowModal} setLoginModal={setLoginModal} />
        </Modal>
      )}
    </>
  );
}

export default PlaceIdLogin;
