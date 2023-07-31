import { IMGS_URL } from '../../../config';
import Button from 'react-bootstrap/Button';
import styles from './AdBox.module.scss';
import { Link } from 'react-router-dom';

const AdBox = ({ title, image, price, location, user, _id }) => {
  return(
    <div className={styles.wrapperBox} >
      <div className={styles.imgBox}>
       <img src={IMGS_URL + image} /> 
      </div>
      <div className={styles.contentBox}>
          <h2>{title}</h2>
          <p>Price: {price}</p>
          <p>Location: {location}</p>
      </div>
      <Link to={'/ad/' + _id}>
        <Button>Read more</Button>
      </Link>
    </div>
  )
};

export default AdBox;