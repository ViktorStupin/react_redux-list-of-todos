import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadTodos } from '../features/todos';
import { TodoList } from './TodoList';
import { TodoModal } from './TodoModal';
import { TodoFilter } from './TodoFilter';

export const TodoApp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, isLoading } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      // Filter by query
      if (query && !todo.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      // Filter by status
      if (status === 'active' && todo.completed) {
        return false;
      }

      if (status === 'completed' && !todo.completed) {
        return false;
      }

      return true;
    });
  }, [todos, query, status]);

  if (isLoading) {
    return (
      <div className="section">
        <div className="container">
          <div data-cy="loader">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Dynamic TODO List</h1>

        <TodoFilter />

        <TodoList todos={filteredTodos} />

        <TodoModal />
      </div>
    </div>
  );
};
