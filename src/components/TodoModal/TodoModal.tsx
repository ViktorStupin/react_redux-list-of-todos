/* eslint-disable */
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todo, user, isLoading } = useAppSelector(state => state.currentTodo);

  if (!todo) {
    return null;
  }

  const handleClose = () => {
    dispatch(clearCurrentTodo());
  };

  return (
    <div data-cy="modal" className="modal is-active">
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p data-cy="modal-header" className="modal-card-title">
            Todo #{todo.id}
          </p>
          <button
            data-cy="modal-close"
            className="delete"
            onClick={handleClose}
          ></button>
        </header>

        <section className="modal-card-body">
          {isLoading ? (
            <div data-cy="loader">Loading user...</div>
          ) : (
            <>
              <div className="field">
                <label className="label">Title:</label>
                <div data-cy="modal-title" className="content">
                  {todo.title}
                </div>
              </div>

              {user && (
                <div className="field">
                  <label className="label">User:</label>
                  <div data-cy="modal-user" className="content">
                    {todo.completed ? 'Done' : 'Planned'} by {user.name}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};
