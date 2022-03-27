import { useState } from 'react';
import { addPlace } from '../../store/places';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { states } from '../../assets/stateAbbreviations'
import { login } from '../../store/session';
import { useAlert } from 'react-alert'
import LoginForm from '../LoginForm'
import './CreatePlaceForm.css'

function CreatePlaceForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();
    const user = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('AL');
    const [zipCode, setZipCode] = useState('');
    const [price, setPrice] = useState('');
    const [guests, setGuests] = useState('');
    const [errors, setErrors] = useState([]);
    const statesArr = Object.keys(states)
    const [imagesList, setImagesList] = useState([{ imageUrl: ''}]);
    const [ , setLoginModal ] = useState(false);

    const demoLogin = (e) => {
        e.preventDefault()
        e.stopPropagation()
		const email = 'demo@aa.io';
		const password = 'password';
		return dispatch(login(email, password)).then( () =>{
            alert.show(<div style={{ textTransform: 'initial' }}>Login Successful</div>)
            setLoginModal(false)
        })
	};

    const addToImagesList = (e, index) => {
      const { name, value } = e.target;
      const newList = [...imagesList];
      newList[index][name] = value;
      setImagesList(newList);
    };

    const handleRemove = index => {
      const newList = [...imagesList];
      newList.splice(index, 1);
      setImagesList(newList);
    };

    const handleAdd = () => {
      setImagesList([...imagesList, { imageUrl: '' }]);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);

        let imageArr = []
        imagesList.map((image) =>  imageArr.push(image.imageUrl))

        const newPlace = {
            user_id: user.id,
            name,
            description,
            address,
            city,
            state,
            zip_code: zipCode,
            price,
            guests: guests,
            images: imageArr
        }
        return dispatch(addPlace(newPlace))
        .then(
            (response) => {
                if (response.errors) {
                    setErrors(response.errors)
                    return
                }
                alert.show(<div style={{ textTransform: 'initial' }}> New Booking Created </div>)
                setShowModal(false);
                const newId = response.id
                history.push(`/places/${newId}`)
            }
            );
        };

        if (user) {
            return (
                <div className='create-place-form-container'>
                <form className='create-place-form' onSubmit={handleSubmit}>
                    {errors.length > 0 ?
                    <ul className='errors-list'>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                            ))}
                    </ul>
                    : null}
                    <h1 className='add-place-header'>Add Place</h1>
                    <div className='input-container'>
                        <input
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className='input add-place'
                            id='name'
                        />
                        <label className={name && 'filled'} htmlFor='name'>Name</label>
                    </div>
                    <div className='input-container'>
                        <input
                            type='text'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className='input add-place'
                            id='description'
                        />
                        <label className={description && 'filled'} htmlFor='description'>Description</label>
                    </div>
                    <div className='input-container'>
                        <input
                            type='text'
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            className='input add-place'
                            id='address'
                        />
                        <label className={address && 'filled'} htmlFor='address'>Address</label>
                    </div>
                    <div className='input-container'>
                        <input
                            type='text'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            className='input add-place'
                            id='city'
                        />
                        <label className={city && 'filled'} htmlFor='city'>City</label>
                    </div>
                    <div className='select-wrap'>
                        <label htmlFor='state'>State</label>
                        <select
                            name='state'
                            value={state}
                            onChange={e => setState(e.target.value)}
                            id='state'>
                                {statesArr.map((state) => <option value={state} key={state}>{state}</option>)}
                        </select>
                    </div>
                    <div className='input-container'>
                        <input
                            type='text'
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
                            className='input add-place'
                            id='zipCode'
                        />
                        <label className={zipCode && 'filled'} htmlFor='zipCode'>Zip Code</label>
                    </div>
                    <div className='input-container'>
                        <input
                            type='number'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className='input add-place'
                            id='price'
                        />
                        <label className={price && 'filled'} htmlFor='price'>Price (per hour)</label>
                    </div>
                    <div className='input-container'>
                        <input
                            type='number'
                            value={guests}
                            onChange={e => setGuests(e.target.value)}
                            className='input add-place'
                            id='guests'
                        />
                        <label className={guests && 'filled'} htmlFor='guests'>Maximum Occupancy</label>
                    </div>
                    <div className='image-input-label'>
                    <label htmlFor='imageUrl'>Please upload 1 - 4 images:</label>
                    </div>
                    {imagesList.map((el, index) => {
                        return (
                            <div className='image-upload-div' key={el}>
                                <input
                                name='imageUrl'
                                type='url'
                                className='image-upload-input'
                                placeholder='Enter Image URL'
                                value={el.imageUrl}
                                key={el.imageUrl}
                                onChange={e => addToImagesList(e, index)}
                                required
                                />
                                <div className='image-upload-button-div' key={index}>
                                    {imagesList.length - 1 === index && index !== 3 && <button onClick={handleAdd} className='image-upload-button'> Add </button>}
                                    {imagesList.length !== 1 && <button onClick={() => handleRemove(index)} className='image-upload-button'> Remove </button>}
                                </div>
                            </div>
                        );
                    })}
                    <div className='form-button-container'>
                        <button className='form-button'>Add Place</button>
                    </div>
                </form>
        </div>
        )
    } else {
        return (
            <>
            <p className='error-login-message'>Please log in to create a new listing</p>
            <LoginForm setLoginModal={setLoginModal} demoLogin={demoLogin} />

            </>
        )
    }
}

export default CreatePlaceForm;
