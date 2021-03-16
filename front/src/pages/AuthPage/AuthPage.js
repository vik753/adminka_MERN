import { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import styles from "./authPage.module.scss";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import {
  changePositionHide,
  changePositionShow,
  hideElements,
  showElements,
} from "../../helpers/animations";

export const AuthPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(false);
  const { httpError, clearHttpError, isLoading, request } = useHttp();
  const { jwtToken, userId, roles, saveLogin, logout, ready, showMessage } = useContext(
    AuthContext
  );
  const history = useHistory();
  const nameInputEl = useRef(null);
  const nameLabelEl = useRef(null);
  const nameDivEl = useRef(null);

  const emailLabelEl = useRef(null);
  const emailInputEl = useRef(null);
  const passLabelEl = useRef(null);
  const passInputEl = useRef(null);


  /*----------------------
   * Error Handler
   * ----------------------*/
  useEffect(() => {
    if (httpError) {
      //TODO create message viewer.
      showMessage(httpError);
      console.log("HTTP Error: ", httpError);
      clearHttpError();
    }
  }, [httpError]);

  useEffect(() => {
    if (jwtToken) {
      history.push("/home");
    }
  }, [jwtToken]);

  const changeHandler = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const method = e.nativeEvent.submitter.name;
      const data = await request("POST", `/auth/${method}`, {
        ...formData,
        userRole: method === "registration" ? "USER" : null,
      });
      const { message, token, userId, roles } = data;
      saveLogin(token, userId, roles);
    } catch (err) {
      console.log("registerHandler error: ", err);
    }
  };

  const chooseAuthHandler = (e) => {
    const hiddenElements = [
      nameDivEl.current,
      nameInputEl.current,
      nameLabelEl.current,
    ];
    const changePositionElements = [
      emailLabelEl.current,
      emailInputEl.current,
      passLabelEl.current,
      passInputEl.current,
    ];
    isLogin ? hideElements(hiddenElements) : showElements(hiddenElements);
    isLogin
      ? changePositionHide(changePositionElements)
      : changePositionShow(changePositionElements);
    setIsLogin((state) => !state);
  };

  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <h1>Authorization</h1>
        <div className={styles.tabs}>
          <button name="loginBtn" onClick={chooseAuthHandler}>
            {isLogin ? "Go to login" : "Go to registration"}
          </button>
        </div>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div
            ref={nameDivEl}
            className={`${styles.inputBox} ${styles.hiddenEl}`}
          >
            <label ref={nameLabelEl} className={styles.hiddenEl} htmlFor="name">
              Name:{" "}
            </label>
            <input
              ref={nameInputEl}
              className={styles.hiddenEl}
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Your name"
            />
          </div>
          <div className={styles.inputBox}>
            <label
              ref={emailLabelEl}
              className={styles.changedPositionElements}
              htmlFor="email"
            >
              Email:{" "}
            </label>
            <input
              ref={emailInputEl}
              className={styles.changedPositionElements}
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={changeHandler}
              placeholder="Your email"
            />
          </div>
          <div className={styles.inputBox}>
            <label
              ref={passLabelEl}
              className={styles.changedPositionElements}
              htmlFor="password"
            >
              Password:{" "}
            </label>
            <input
              ref={passInputEl}
              className={styles.changedPositionElements}
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
              <button name="registration" className={styles.btn} disabled={isLoading}>
                REGISTER
              </button>
            ) : (
              <button name="login" className={styles.btn} disabled={isLoading}>
                LOGIN
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
