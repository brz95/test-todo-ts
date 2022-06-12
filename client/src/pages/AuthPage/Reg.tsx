import React, { useState } from "react";
import styles from "./auth.module.css";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { regUser } from "../../app/reducers/auth/ActionCreators";
import Input from "../../components/Input";

const Reg: React.FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const reg = () => {
    if (email && nickname && password) {
      dispatch(regUser({ email, nickname, password }));
    }
    setEmail("");
    setPassword("");
    setNickname("");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <p className={styles.form_title}>Вы на странице регистрации 👀</p>
          <div>
            <Input
              id="outlined-basic"
              label="Ваш E-Mail"
              type="text"
              variant="outlined"
            />
            <Input
              id="outlined-basic"
              label="Ваш ник"
              type="text"
              variant="outlined"
            />
            <Input
              id="outlined-basic"
              label="Ваш пароль"
              type="password"
              variant="outlined"
            />
          </div>
        </div>
        <div className={styles.panel_container}>2</div>
      </div>
    </div>
  );
};

export default Reg;
