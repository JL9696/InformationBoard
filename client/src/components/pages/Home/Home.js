import styles from './Home.module.scss';
import { getUser } from '../../../redux/usersRedux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../Search/Search';

const Home = () => {
  const loggedInUser = useSelector(getUser);

  return(
    <div className="home">
      <Search />
      {loggedInUser&&<Link to="/ads/add">Add advertising</Link>}
    </div>     
  )
};

export default Home;