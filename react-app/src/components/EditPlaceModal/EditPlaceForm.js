import { useState } from 'react';
import { editPlace, getPlaces, removeImage } from '../../store/places';
import { useDispatch, useSelector } from 'react-redux';
import { states } from '../../assets/stateAbbreviations'
import { useAlert } from 'react-alert'
import './EditPlaceForm.css'

function EditPlaceForm({ place, setShowModal }) {
    const dispatch = useDispatch();
    const alert = useAlert();
    const user_id = useSelector(state => state.session.user.id);
    const [name, setName] = useState(place.name);
    const [description, setDescription] = useState(place.description);
    const [address, setAddress] = useState(place.address);
    const [city, setCity] = useState(place.city);
    const [state, setState] = useState(place.state);
    const [zipCode, setZipCode] = useState(place.zip_code);
    const [price, setPrice] = useState(place.price);
    const [guests, setGuests] = useState(place.guests);
    const [errors, setErrors] = useState([]);
    const statesArr = Object.keys(states)
    const [imagesList, setImagesList] = useState(place.images);

    const addToImagesList = (e, index) => {
        const { name, value } = e.target;
        const newList = [...imagesList];
        newList[index][name] = value;
        setImagesList(newList);
    };

    const handleRemove = index => {
        const newList = [...imagesList];
        let image = newList.splice(index, 1);
        setImagesList(newList);

        const imagePayload = {
            id: image[0].id,
            place_id: place.id,
            url: image[0].url,
        }
        dispatch(removeImage(imagePayload))
        dispatch(getPlaces())
    };

    const handleAdd = () => {
        setImagesList([...imagesList, { url: '' }]);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors([]);


        let imageArr = []
        imagesList.map((image) =>  imageArr.push(image.url))

        const newPlace = {
            id: place.id,
            user_id,
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

        return dispatch(editPlace(newPlace)), dispatch(getPlaces())
            .then(
                (response) => {
                    if (response.errors) {
                        setErrors(response.errors)
                        return
                    }
                    alert.show(<div style={{ textTransform: 'initial' }}> Changes Complete </div>)
                    setShowModal(false);
                }
            );
    };

    return (
        <div className="form-container">
            <form className='form' onSubmit={handleSubmit}>
                {errors.length > 0 ?
                <ul className='errors-list'>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                        ))}
                </ul>
                : null}
                <h1 className='add-place-header'>Edit Place</h1>
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
                                name='url'
                                type='url'
                                className='image-upload-input'
                                placeholder='Enter Image URL'
                                value={el.url}
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

export default EditPlaceForm;
