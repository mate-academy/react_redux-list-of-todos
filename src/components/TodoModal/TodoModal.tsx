import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader';
import { User } from '../../Types/User';
import { getUser } from '../../api';
import { Todo } from '../../Types/Todo';
import { selectors } from '../../store';
import { todoActions } from '../../store/currentTodo';

interface Props {
  todo: Todo,
}

export const TodoModal: React.FC<Props> = (props) => {
  const { todo } = props;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(todo.userId).then(userFromServer => setUser(userFromServer));
  }, []);

  const dispatch = useDispatch();
  const selectedTodo = useSelector(selectors.selectedTodo);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(todoActions.RemoveTask);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
