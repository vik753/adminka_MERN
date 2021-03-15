import { NavLink } from "react-router-dom";
import styles from "./navbar.module.scss";

export const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div>
        <h3>LOGO</h3>
      </div>
      <div className={styles.page_container}>
        <NavLink
          className={styles.navlink}
          activeClassName={styles.activeLink}
          to="/home"
        >
          Home
        </NavLink>
        <NavLink
          className={styles.navlink}
          activeClassName={styles.activeLink}
          to="/admin"
        >
          Admin
        </NavLink>
        <NavLink
          className={styles.navlink}
          activeClassName={styles.activeLink}
          to="/logout"
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};
