import { API_URL } from '../../../config';
import { logOut } from '../../../redux/usersRedux'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Logout = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const option = {
            method: 'DELETE',
        };

        fetch(`${API_URL}/api/logout`, option)
            .then(() => {
                dispatch(logOut())
            });
    }, [dispatch]);

    return null;
}

export default Logout;