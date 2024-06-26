import React from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const { setCurrentTodo } = currentTodoSlice.actions;
  const dispatch = useDispatch();
  const [user, setUser] = React.useState<User | null>(null);
  const { id, title, completed, userId }: Todo = useSelector(
    state => state.currentTodoReducer,
  );

  getUser(userId).then((resp: User) => {
    setUser(resp);
  });

  const handleCloseModal = () => {
    dispatch(setCurrentTodo(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && <Loader />}

      {user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {!completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {/* For completed */}
              {completed && <strong className="has-text-success">Done</strong>}
              {' by '}
              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
