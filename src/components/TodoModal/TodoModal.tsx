import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [todoAuthor, setTodoAuthor] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentTodo = useAppSelector(store => store.currentTodo);

  useEffect(() => {
    if (currentTodo?.userId) {
      getUser(currentTodo?.userId)
        .then(user => setTodoAuthor(user))
        .finally(() => setIsLoaded(true));
    }

    return setIsLoaded(false);
  }, [currentTodo]);

  return (
    <div
      className={cn('modal', {
        'is-active': currentTodo,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {!isLoaded && <Loader />}

      {isLoaded && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoActions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {currentTodo?.completed && (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href={`mailto:${todoAuthor?.email}`}>{todoAuthor?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
