import styles from './Navbar.module.scss';

const Navbar = () => {
  return(
    <>
    <div className={styles.navbar}>
      <div className={styles.navTitle}>
        <h1>Notice Board</h1>
      </div>
      <div className={styles.navItem}>
        <ul>
          <li>Home</li>
          <li>Sign in </li>
          <li>Register</li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Navbar;