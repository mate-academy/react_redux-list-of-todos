import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { actions } from '../../features/currentTodo';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState(true);
  const selectTodo = useAppSelector((state: RootState) => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectTodo) {
      setLoader(false);
      setUser(null);

      return;
    }

    setLoader(true);
    getUser(selectTodo.userId)
      .then(setUser)
      .finally(() => {
        setLoader(false);
      });
  }, [selectTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader && <Loader />}

      {!loader && selectTodo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(actions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-success': selectTodo.completed,
                  'has-text-danger': !selectTodo.completed,
                })}
              >
                Done
              </strong>
              {' by '}
              <a href={user?.email}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
