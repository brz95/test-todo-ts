import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../app/reducers/auth/ActionCreators";
import DarkMode from "../../components/DarkMode/DarkMode";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import styles from "./auth.module.css";

const Login: React.FC = () => {
  const { error, loading } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handlePassword = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleNickname = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNickname(e.target.value);
  };

  const login = () => {
    if (nickname && password) {
      dispatch(loginUser({ nickname, password }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch(() => {
          return { error: error };
        });
    }
  };

  return (
    <div className={styles.auth_box}>
      <div className={styles.login_box}>
        <div className={styles.darkmode_box}>
          <DarkMode />
        </div>
        <div className={styles.login}>
          <div className={styles.auth_form}>
            <h2>Войдите</h2>
            <div className={styles.error}>{error}</div>
            <input
              type="text"
              placeholder="Ваш ник"
              onChange={handleNickname}
            />
            <input
              type="password"
              placeholder="Ваш пароль"
              onChange={handlePassword}
            />
            {loading ? (
              <div className={styles.loader_box}>
              <span className={styles.auth_loader}></span>
              </div>
            ) : (
              <input
                type="submit"
                value="Войти"
                className={styles.submit}
                onClick={login}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
