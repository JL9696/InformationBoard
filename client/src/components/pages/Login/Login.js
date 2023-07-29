import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { API_URL } from '../../../config';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { logIn } from '../../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError'
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        };

        setStatus('loading');
        fetch(`${API_URL}/auth/login`, options)
            .then(res => {
                if (res.status === 200) {
                    setStatus('success');
                    dispatch(logIn({ login }));
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else if (res.status === 400) {
                    setStatus('clientError');
                } else {
                    setStatus('serverError');
                }
            })
            .catch(err => {
                setStatus('serverError');
            });
    }

    return (
        <Form className={styles.login} onSubmit={handleSubmit}>

            <h1 className="my-4">Login</h1>

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

            <Form.Group className="mb-3" controlID="formLogin">
                <Form.Label> Login </Form.Label>
                <Form.Control type="text" value={login} onChange={e => setLogin(e.target.value)} placeholder="Enter Login" />
            </Form.Group>

            <Form.Group className="mb-3" controlID="formPassword">
                <Form.Label> Password </Form.Label>
                <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password" />
            </Form.Group>
            <Button type="submit" variant="primary">Log in</Button>
        </Form>
    )
}

export default Login;