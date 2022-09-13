import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { RootState } from '../../app/store';
import { getUser } from '../../api';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { removeTodo } = actions;
  const dispatch = useDispatch();

  const selectCurrentTodo = (state: RootState) => state.currentTodo;

  const currentTodo = useSelector(selectCurrentTodo);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setUser);
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
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
              Todo #
              {currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(removeTodo());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              { currentTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={user.email}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
