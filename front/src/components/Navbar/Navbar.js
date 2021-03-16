import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import styles from "./navbar.module.scss";
import { AuthContext } from "../../context/AuthContext";

export const Navbar = () => {
  const { logout, roles } = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
    history.push("/");
  };

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
        {roles.includes('ADMIN') && (
          <NavLink
            className={styles.navlink}
            activeClassName={styles.activeLink}
            to="/admin"
          >
            Admin
          </NavLink>
        )}
        <a className={styles.navlink} onClick={logoutHandler}>
          Logout
        </a>
      </div>
    </nav>
  );
};
