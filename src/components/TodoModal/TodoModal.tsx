/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  selectedTodo: Todo;
};

const defaultUser: User = {
  id: 0,
  name: 'Default Username',
  email: 'Default Email',
  phone: 'Default Phonenumber',
};

export const TodoModal: React.FC<Props> = ({ selectedTodo }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const dispatch = useDispatch();

  const selectedUserId = selectedTodo.userId;

  useEffect(() => {
    getUser(selectedUserId)
      .then(setUser)
      .catch(() => console.error('Error while trying to load user!'));
  }, [selectedUserId]);

  const isLoaded = selectedTodo && user !== defaultUser;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => dispatch(currentTodoSlice.actions.viewTodo(null))}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-success': selectedTodo.completed,
                  'has-text-danger': !selectedTodo.completed,
                })}
              >
                {selectedTodo.completed ? `Done` : `Planned`}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
