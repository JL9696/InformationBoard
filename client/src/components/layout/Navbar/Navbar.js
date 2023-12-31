import styles from './Navbar.module.scss';
import { Navbar, NavbarBrand, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'
import { getUser } from '../../../redux/usersRedux';

const NavBar = () => {
  const user = useSelector(getUser);

  return (
    <Navbar className={styles.navbar}>
      <NavbarBrand className={styles.navTitle}>Notice Board</NavbarBrand>
      <Nav>
        <ul className={styles.nav_links}>
          <li>
            <NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined}
              to="/"> Home
            </NavLink>
          </li>
          <li>
            {!user && (
              <NavLink
                className={({ isActive }) => isActive ? styles.linkActive : undefined}
                to="/login"> Sign in
              </NavLink>
            )}
          </li>
          <li>
            {!user && (
              <NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined}
                to="/register" > Register
              </NavLink>
            )}
          </li>
          <li>
            {user && (<NavLink className={({ isActive }) => isActive ? styles.linkActive : undefined}
              to="/logout"> Logout
            </NavLink>
            )}
          </li>
        </ul>
      </Nav>
    </Navbar>
  );
}

export default NavBar;