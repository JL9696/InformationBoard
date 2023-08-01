import { useSelector, useDispatch } from 'react-redux';
import { getAllAds, fetchAdvertBySearchPhrase } from '../../../redux/adRedux';
import { useParams } from 'react-router';
import { useEffect } from 'react';

import AdBox from '../../features/AdBox/AdBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Search = () => {
  const { searchPhrase } = useParams();
  const dispatch = useDispatch();
  const ads = useSelector(getAllAds);

  useEffect(() => {
    dispatch(fetchAdvertBySearchPhrase(searchPhrase));
  }, []);

  return (
    <Row xs={1} md={4} className='g-3 my-5'>
      {ads.map((ad) => (
        <Col key={ad._id}>
          <AdBox {...ad} />
        </Col>
      ))}
    </Row>
  );
};

export default Search;