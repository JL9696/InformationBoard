import { useParams, useNavigate } from 'react-router-dom';
import styles from './Ad.module.scss';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAdById, updateAds, editAd } from '../../../redux/adRedux';
import { getUser } from '../../../redux/usersRedux';
import { getUserId } from '../../../redux/userData';
import { Link } from 'react-router-dom';
import { API_URL, IMGS_URL } from '../../../config';
import Card from 'react-bootstrap/Card';
import ModalDel from '../../features/ModalDel/ModalDel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';

const Ad = () => {
  const navigate = useNavigate();
  const user = useSelector(getUser);
  const adId = useParams();
  const id = adId.id;
  const ad = useSelector((state) => getAdById(state, id));
  const userId = useSelector(getUserId);
  const adData = useSelector((state) => getAdById(state, id));

  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(null);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDelete = (e) => {
    e.preventDefault();
    const options = {
      method: 'DELETE',
      credentials: 'include',
    };
    fetch(API_URL + '/api/ad/' + id, options)
    .then((res) => {
      if (res.status === 200) {
        setStatus('succes')
        dispatch(updateAds({ ...adData, id }));
        setTimeout(() => navigate('/'), 1000);
      } else {
        setStatus('serverError');
      }
    })
  .catch(err => {
    console.log(err);
    setStatus('serverError');
  });
  };

return (
  <Row className="d-flex justify-content-center mt-5">
    {showModal && (
      <ModalDel
        showModal={showModal}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
    )};
    <Col xs="12" lg="5">
      <Card className={styles.card_wrapper}>
        <Card.Img variant="top" src={IMGS_URL + ad.image} />
        <Card.Body>
          <Card.Title className="mb-3">Title: {ad.title}</Card.Title>
          <Card.Subtitle className="mb-3">
            <b>Price: {ad.price}$</b>
          </Card.Subtitle>
          <Card.Text className="mb-3">
            <b>Localization: {ad.location}</b>
          </Card.Text>
          <Card.Text>{ad.description}</Card.Text>
          <Card.Text>Published: {ad.pubDate}</Card.Text>
          <Card.Text>Author: {ad.user.login}</Card.Text>
          <Card.Text>
            Avatar:{' '}
            <img className={styles.avatar} src={IMGS_URL + ad.user.avatar} alt="user avatar" />
          </Card.Text>
          <Card.Text>Phone number: {ad.user.telephon}</Card.Text>
        </Card.Body>
        {user.login === ad.user.login && (
          <Col className={styles.button} xs="12" lg="4">
            <Link to={'/ad/edit/' + id}>
              <Button variant="outline-info" className="m-2">
                Edit
              </Button>
            </Link>
            <Button variant="outline-danger" onClick={handleShow}>
              Delete
            </Button>
          </Col>
        )}
      </Card>
    </Col>
  </Row>

)
}

export default Ad;