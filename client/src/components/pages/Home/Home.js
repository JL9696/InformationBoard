import styles from './Home.module.scss';
import { getUser } from '../../../redux/usersRedux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CollectionAds from '../../features/CollectionAds/CollectionAds';

const Home = () => {
  const loggedInUser = useSelector(getUser);

  return(
    <div className='home'>
      <h1>Home</h1>
      <CollectionAds />
      {loggedInUser&&<Link to="/ads/add">Add advertising</Link>}
    </div>     
  )
};

export default Home;