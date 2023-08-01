import styles from './AdAdd.module.scss';
import { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { API_URL } from '../../../config';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const AddAds = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [pubDate, setPubDate] = useState('')
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState(null);

    const currentUser = localStorage.getItem('loggedInUser');
    console.log(currentUser);

    const handleSubmit = e => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('title', title);
        fd.append('description', description);
        fd.append('price', price);
        fd.append('location', location);
        fd.append('image', image);
        fd.append('user', currentUser);

        const option = {
            method: 'POST',
            credentials: 'include',
            body: fd,
        };

        fetch(`${API_URL}/api/ad`, option)
            .then(res => {
                if (res.status === 201) {
                    setStatus('success');
                    dispatch(editAd({ ...ad, adId }));
                    navigate('/');
                } else if (res.status === 400) {
                    setStatus('clientError');
                } else if (res.status === 409) {
                    setStatus('loginError');
                } else {
                    setStatus('serverError'); 
                }
            })
            .catch(err => {
                console.log(err);
                setStatus('serverError');
            });
    }

    return (

        <Form className={styles.adsForm} onSubmit={handleSubmit}>

            <h1>Ad Add</h1>

            {status === "success" && (
                <Alert variant='success'>
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been successfully logged in</p>
                </Alert>
            )}

            {status === "clientError" && (
                <Alert variant='danger'>
                    <Alert.Heading>Incorrect data</Alert.Heading>
                    <p>Login or password are incorrect...</p>
                </Alert>
            )}

            {status === "serverError" && (
                <Alert variant='danger'>
                    <Alert.Heading>Something went wrong!</Alert.Heading>
                    <p>Unexpected error please try again</p>
                </Alert>
            )}

            {status === "loading" && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}

            <Form.Group className={styles.dform}>
                <Form.Label>Title: </Form.Label>
                <Form.Control value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" type="text" />
            </Form.Group>

            <Form.Group className={styles.dform}>
                <Form.Label>Description: </Form.Label>
                <Form.Control value={description} onChange={e => setDescription(e.target.value)} rows="5" cols="30" />
            </Form.Group>

            <Form.Group className={styles.dform}>
                <Form.Label>Price: </Form.Label>
                <Form.Control value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter price" type="number" />
            </Form.Group>

            <Form.Group className={styles.dform}>
                <Form.Label>Date: </Form.Label>
                <Form.Control value={pubDate} onChange={e => setPubDate(e.target.value)} placeholder="Enter date" type="date" />
            </Form.Group>

            <Form.Group className={styles.dform}>
                <Form.Label>Locaction: </Form.Label>
                <Form.Control value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter location" type="text" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Image: </Form.Label>
                <Form.Control type="file" onChange={e => setImage(e.target.files[0])} />
            </Form.Group>
            <Button type="submit" variant="primary" className="button">Submit</Button>
        </Form>

    )
};

export default AddAds;