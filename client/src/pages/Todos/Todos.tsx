import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { addTodo, fetchTodos } from "../../app/reducers/todo/TodoCreators";
import DarkMode from "../../components/DarkMode/DarkMode";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ITodo } from "../../models/ITodo";
import styles from "./todos.module.css";

const Todos: React.FC = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>("");
  const { id } = useAppSelector((state) => state.userReducer);
  const { todos, loading } = useAppSelector((state) => state.todoReducer);
  const user = id;
  console.log(todos);
  
  const handleInputTodo = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setText(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchTodos())
    .unwrap()
    .then(() => {return 'Тудушка'})
    .catch(() => {return 'Ошибка'});
  }, [dispatch]);

  const handleAddTodo = () => {
    if (text) {
      dispatch(addTodo({ text, user }));
    }
  };

  return (
    <div className={styles.todo_page}>
      <DarkMode />
      <div className={styles.todo_box}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label>Todo by</Form.Label>
          <div className={styles.todo_header}>
            <Form.Control
              type="text"
              className={styles.todo_input}
              value={text}
              onChange={handleInputTodo}
              placeholder="Запишите дело"
            />
            <div className={styles.todo_header_button}>
              <Button variant="success" onClick={handleAddTodo}>
                Добавить
              </Button>
            </div>
          </div>
        </Form.Group>
        <div className={styles.todos_box}>
          {loading ? (
            <div className={styles.todo_loader}>
              <span className={styles.loader_todo}>Загрузка...</span>
            </div>
          ) : (
            todos.map(
              (item: ITodo) =>
                item.user === id && (
                  <div key={item._id} className={styles.todos_form_box}>
                    {item.text}
                  </div>
                )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
