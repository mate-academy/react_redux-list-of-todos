import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

const emptyUser: User = {
  id: 0,
  name: 'User Name',
  email: 'User Email',
  phone: 'UserPhone',
};

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const todo = useAppSelector(state => state.currentTodo) as Todo;

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>(emptyUser);

  const closeModal = useCallback(
    () => dispatch(currentTodoSlice.actions.clear()),
    [dispatch],
  );

  useEffect(() => {
    setLoading(true);

    getUser(todo.userId)
      .then(setUser)
      // eslint-disable-next-line no-console
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [todo.userId]);

  const { id, title, completed } = todo;
  const { name, email } = user;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      {!loading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${email}`}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
