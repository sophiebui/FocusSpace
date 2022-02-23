import { useState } from 'react';
import { addPlace } from '../../store/places';
import { useDispatch, useSelector } from 'react-redux';
import { states } from '../../assets/stateAbbreviations'

import './CreatePlaceForm.css'
function CreatePlaceForm({ setShowModal }) {
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.session.user.id);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('AL');
    const [zipCode, setZipCode] = useState('');
    const [price, setPrice] = useState('');
    const [guests, setGuests] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState('');
    const statesArr = Object.keys(states)
    const [imagesList, setImagesList] = useState([{ imageUrl: ''}]);

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
        const images = imagesList.map((image) =>  image.imageUrl)

        const newPlace = {
            user_id,
            name,
            description,
            address,
            city,
            state,
            zip_code: zipCode,
            price,
            guests: guests,
            images
        }

        return dispatch(addPlace(newPlace))
            .then(
                (response) => {
                    if (response.errors) {
                        setErrors(response.errors)
                        return
                    }
                    setSuccess('Success!');
                    setTimeout(() => {
                        setShowModal(false);
                    }, 1500);
                }
            );
    };

    return (
        <div className='form-container'>
            <form className='form' onSubmit={handleSubmit}>
                <h2>
                    {success}
                </h2>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>

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
                        type='text'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className='input add-place'
                        id='price'
                    />
                    <label className={price && 'filled'} htmlFor='price'>Price</label>
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
                {imagesList.map((el, index) => {
                    return (
                        <div className='image-upload-div'>
                            <input
                            name='imageUrl'
                            type='url'
                            className='image-upload-input'
                            placeholder='Enter Image URL'
                            value={el.imageUrl}
                            onChange={e => addToImagesList(e, index)}
                            required
                            />
                            <div className='image-upload-button-div'>
                                {imagesList.length - 1 === index && <button onClick={handleAdd} className='image-upload-button'> Add </button>}
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
}

export default CreatePlaceForm;
