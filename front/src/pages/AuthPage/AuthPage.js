import { useState, useEffect, useContext } from "react";
import {useHistory} from "react-router-dom";

import styles from "./authPage.module.scss";
import { useHttp } from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";

export const AuthPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const { httpError, clearHttpError, isLoading, request } = useHttp();
  const { jwtToken, userId, roles, saveLogin, logout, ready } = useContext(AuthContext);
  const history = useHistory();

  /*----------------------
  * Error Handler
  * ----------------------*/
  useEffect(() => {
    if (httpError) {
      //TODO create message viewer.
      console.log("HTTP Error: ", httpError);
      clearHttpError();
    }
  }, [httpError]);

  useEffect(() => {
    if (jwtToken) {
      setIsLogin(true);
      history.push("/home")
    }
  }, [jwtToken]);

  const changeHandler = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const registerHandler = async (e) => {
    try {
      const data = await request("POST", "/auth/registration", {
        ...formData,
        userRole: "USER",
      });
      const { message, token, userId, roles } = data;
      saveLogin(token, userId, roles);
      console.log("registerHandler :", message);
    } catch (err) {
      console.log("registerHandler error: ", err);
    }
  };

  const loginHandler = async (e) => {
    try {
      const data = await request("POST", "/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      const { message, token, userId, roles } = data;
      saveLogin(token, userId, roles);
    } catch (err) {
      console.log("loginHandler error: ", err);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <h1>Authorization</h1>
        <div className={styles.tabs}>
          <input
            type="button"
            name="loginBtn"
            value={isLogin ? "Go to login" : "Go to registration"}
            onClick={() => setIsLogin((state) => !state)}
          />
        </div>
        <div className={styles.form}>
          {isLogin && (
            <div className={styles.inputBox}>
              <label htmlFor="name">Name: </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={changeHandler}
                placeholder="Your name"
              />
            </div>
          )}
          <div className={styles.inputBox}>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Your email"
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Your password"
            />
          </div>
          <div className={styles.btn_group}>
            {isLogin ? (
              <button onClick={registerHandler} className={styles.btn}>
                REGISTER
              </button>
            ) : (
              <button onClick={loginHandler} className={styles.btn}>
                LOGIN
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
