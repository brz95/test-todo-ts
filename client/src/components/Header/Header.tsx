import React from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import styles from './header.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">ToDo v bredu</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <div className={styles.links_box}>
            <Link to="/todo" className={styles.header_link}>Запилить тудушку</Link>
            <Link to="/users" className={styles.header_link}>Пользователи</Link>
            <Link to="/admin" style={{pointerEvents: "none"}} className={styles.header_link}>
              Панель админа
            </Link>
            </div>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Поиск"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Найти</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar></div>
  );
};

export default Header;
