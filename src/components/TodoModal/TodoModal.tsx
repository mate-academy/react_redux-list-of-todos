import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo) as Todo;
  const dispatch = useAppDispatch();
  const { setCurrent } = currentTodoSlice.actions;
  const [currentUser, setCurrentUser] = useState<User>();
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (currentTodo) {
      setIsLoad(true);

      getUser(currentTodo.userId)
        .then(response => {
          setCurrentUser(response);
        })
        .finally(() => {
          setIsLoad(false);
        });
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoad && <Loader />}

      {!isLoad && currentUser && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(setCurrent(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${currentUser.email}`}>{currentUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
