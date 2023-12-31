import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from './Register.module.scss';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import { API_URL } from '../../../config';
import { Alert } from 'react-bootstrap';

const Register = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'

    const handleSubmit = e => {
        e.preventDefault();
        console.log(login, password, phone, avatar);

        const fd = new FormData();
        fd.append('login', login);
        fd.append('password', password);
        fd.append('avatar', avatar);
        fd.append('telephon', phone);

        const options = {
            method: 'POST',
            credentials: 'include',
            body: fd,
        };

        setStatus('loading')
        fetch(`${API_URL}/api/auth/register`, options)
            .then(res => {
                if (res.status === 201) {
                    setStatus('success')
                } else if (res.status === 400) {
                    setStatus('clientError')
                } else if (res.status === 409) {
                    setStatus('loginError')
                } else {
                    setStatus('serverError')
                }
            })
            .catch(err => {
                setStatus('serverError')
            });
    }

    return (
        <Form className={styles.form} onSubmit={handleSubmit}>

            <h1 className="my-4">Sign Up</h1>

            {status === "success" && (
                <Alert variant="success">
                    <Alert.Heading>Success!</Alert.Heading>
                    <p>You have been succesfully registered! You can now log in...</p>
                </Alert>
            )}

            {status === "serverError" && (
                <Alert variant="danger">
                    <Alert.Heading>Something went wrong...</Alert.Heading>
                    <p>Unexpected error... Try again!</p>
                </Alert>
            )}

            {status === "clientError" && (
                <Alert variant="danger">
                    <Alert.Heading>No enough data</Alert.Heading>
                    <p>You have to fill all the fields.</p>
                </Alert>
            )}

            {status === "loginError" && (
                <Alert variant="warning">
                    <Alert.Heading>Login alredy in use</Alert.Heading>
                    <p>You have to use other login.</p>
                </Alert>
            )}

            {status === "loading" && (
                <Spinner animation="border" role="status">
                    <span className="vissually-hidden"> Loading... </span>
                </Spinner>
            )}

            <Form.Group className="mb-3" controlID="formLogin">
                <Form.Label> Login </Form.Label>
                <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter Login" />
            </Form.Group>

            <Form.Group className="mb-3" controlID="formPassword">
                <Form.Label> Password </Form.Label>
                <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlID="formPhone">
                <Form.Label> Phone Number </Form.Label>
                <Form.Control type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" />
            </Form.Group>

            <Form.Group className="mb-3" controlID="formFile">
                <Form.Label> Avatar </Form.Label>
                <Form.Control type="file" onChange={e => setAvatar(e.target.files[0])} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>

        </Form>
    )
}

export default Register;