// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { TodoApp } from './components/TodoApp';

const USER_ID = 1; // Changed from 0 to 1

const UserWarning: React.FC = () => (
  <section className="section">
    <p className="box is-size-3">
      Please get your <b> userId </b>{' '}
      <a href="https://mate-academy.github.io/react_student-registration">
        here
      </a>{' '}
      and save it in the app <pre>const USER_ID = ...</pre>
      All requests to the API must be sent with this
      <b> userId.</b>
    </p>
  </section>
);

export const App: React.FC = () => {
  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
};
