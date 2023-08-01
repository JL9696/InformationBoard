import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AdBox from '../../features/AdBox/AdBox';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, getAllAds } from '../../../redux/adRedux';
import { getUser } from '../../../redux/usersRedux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = () => {
  const ads = useSelector(getAllAds);
  const user = useSelector(getUser);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchData()), [dispatch]);

  if (!ads) {
    return (
      <Spinner animation='border' role='status' className='d-block mx-auto'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    );
  }
  return (
    <div>
      <Row className='justify-content-end align-items-center my-5'>
        <Col className=''>
        </Col>
        <Col>
          <Form className='d-flex'>
            <Form.Control
              type='search'
              placeholder='Search'
              className='me-2'
              aria-label='Search'
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant='success' as={Link} to={'/search/' + search}>
              Search
            </Button>
          </Form>
        </Col>
        <Col className='d-flex flex-row-reverse '>
          {user && (
            <Link to='/ad/add'>
              <Button variant='primary'>Add new ad</Button>{' '}
            </Link>
          )}
        </Col>
      </Row>
      <Row xs={1} md={4} className='g-3 '>
        {ads.map((ad) => (
          <Col key={ad._id}>
            <AdBox {...ad} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;