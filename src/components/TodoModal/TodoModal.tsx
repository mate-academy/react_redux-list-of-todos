import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { actions as currentTodoactions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(null);
    if (selectedTodo) {
      getUser(selectedTodo?.userId)
        .then(setUser);
    }
  }, [selectedTodo]);

  if (!selectedTodo) {
    return null;
  }

  const {
    id,
    title,
    completed,
  } = selectedTodo;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (<Loader />) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              aria-label="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoactions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{title}</p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames({
                'has-text-danger': !completed,
                'has-text-success': completed,
              })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href="mailto:Sincere@april.biz">{user.name}</a>
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
