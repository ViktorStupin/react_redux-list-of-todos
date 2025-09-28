import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { getTodos } from './api';
import { setTodos } from './features/todos/todosSlice';
import { Todo } from './types/Todo';
import React = require('react');

export const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((todos: Todo[]) => {
        dispatch(setTodos(todos));
      })
      .catch(() => {
        // Обробка помилки без використання змінної error
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              {!isLoading && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
