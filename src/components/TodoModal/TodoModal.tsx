import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';
import cn from 'classnames';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(true);
  const [todoUser, setTodoUser] = useState<User | null>(null);

  useEffect(() => {
    setLoader(true);

    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setTodoUser)
        .catch(() => {
          throw new Error();
        })
        .finally(() => setLoader(false));
    }
  }, [currentTodo]);

  const handleClearCurrentTodo = () => {
    dispatch(currentTodoSlice.actions.clearCurrentTodo());
    setTodoUser(null);
  };

  return (
    <div
      className={cn('modal', {
        'is-active': currentTodo,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />
      {loader && <Loader />}

      {currentTodo && todoUser && !loader && (
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
              onClick={handleClearCurrentTodo}
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
              <a href={`mailto:${todoUser.email}`}>{todoUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
