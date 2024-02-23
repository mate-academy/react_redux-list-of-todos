/* eslint-disable max-len */
import React from 'react';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const todo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = React.useState<User | null>(null);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (todo) {
      getUser(todo.userId).then((userItem: User) => setUser(userItem));
    }
  }, [todo]);

  const handleModalCloseClick = () => {
    dispatch(currentTodoActions.removeTodo());
    setUser(null);
  };

  return (
    <>
      {todo && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {user
            ? (
              <div className="modal-card">
                <header className="modal-card-head">
                  <div
                    className="modal-card-title has-text-weight-medium"
                    data-cy="modal-header"
                  >
                    {`Todo #${todo.id}`}
                  </div>

                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button type="button" className="delete" data-cy="modal-close" onClick={handleModalCloseClick} />
                </header>

                <div className="modal-card-body">
                  <p className="block" data-cy="modal-title">
                    {todo.title}
                  </p>

                  <p className="block" data-cy="modal-user">
                    {
                      todo.completed
                        ? <strong className="has-text-success">Done</strong>
                        : <strong className="has-text-danger">Planned</strong>
                    }
                    {' by '}
                    <a href={`mailto:${user.email}`}>
                      {user.name}
                    </a>
                  </p>
                </div>
              </div>
            )
            : <Loader />}
        </div>
      )}
    </>
  );
};
