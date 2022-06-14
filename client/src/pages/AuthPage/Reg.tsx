import React, { ChangeEvent, useState } from "react";
import styles from "./auth.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import LoadingButton from "@mui/lab/LoadingButton";
import { regUser } from "../../app/reducers/auth/ActionCreators";
import Box from "@mui/material/Box";
import ButtonForAuth from "../../components/ButtonForAuth";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import DarkMode from "../../components/DarkMode/DarkMode";
import { useNavigate } from "react-router-dom";

const Reg: React.FC = () => {
  const { error, loading } = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmail = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEmail(e.target.value);
  };
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

  const reg = () => {
    if (email && nickname && password) {
      dispatch(regUser({ email, nickname, password }))
        .unwrap()
        .then(() => {
          navigate("/login");
        })
        .catch(() => {
          return {error: error};
        });
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <DarkMode />
        <div className={styles.form_container}>
          <p className={styles.form_title}>Вы на странице регистрации 👀</p>
          <div className={styles.form__inputs}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 },
              }}
              noValidate
              autoComplete="off"
              className={styles.form}
            >
              <TextField
                id="filled-basic"
                label="Ваш E-Mail"
                type="text"
                variant="filled"
                value={email}
                autoFocus={true}
                onChange={(e) => handleEmail(e)}
              />
              <TextField
                id="filled-basic"
                label="Ваш ник"
                variant="filled"
                type="text"
                value={nickname}
                onChange={(e) => handleNickname(e)}
              />
              <TextField
                id="filled-basic"
                label="Ваш пароль"
                variant="filled"
                type="password"
                value={password}
                onChange={(e) => handlePassword(e)}
              />
              <Stack direction="row" spacing={2} className={styles.button_auth}>
                <LoadingButton
                  loading={loading}
                  onClick={reg}
                  variant="outlined"
                >
                  Зарегистрироваться
                </LoadingButton>
              </Stack>
              <div className={styles.error}>{error}</div>
            </Box>
          </div>
        </div>
        <div className={styles.panel_container}>
          <div className={styles.reg_info}>
            <span className={styles.redirect_info}>Уже есть аккаунт?</span>
          </div>
          <ButtonForAuth />
        </div>
      </div>
    </div>
  );
};

export default Reg;
