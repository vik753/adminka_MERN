import styles from "./authPage.module.scss";
import { useState } from "react";

export const AuthPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const changeHandler = (e) => {
    setFormData((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
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
        <form>
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
        </form>
      </div>
    </div>
  );
};
