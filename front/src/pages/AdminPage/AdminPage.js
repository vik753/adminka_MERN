import styles from './adminPage.module.scss'
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

export const AdminPage = () => {
  const {
    jwtToken,
    userId,
    userName,
    roles,
    saveLogin,
    logout,
    ready,
    showMessage,
  } = useContext(AuthContext);

  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  )
}