import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [author, setAuthor] = useState<User | null>(null);
  const [hasError, setHasError] = useState(false);
  const handleClose = () => dispatch(currentTodoActions.removeTodo());
  const completed = currentTodo?.completed;
  const userId = currentTodo?.userId;
  const id = currentTodo?.id;
  const title = currentTodo?.title;

  useEffect(() => {
    setHasError(false);
    if (userId) {
      getUser(userId)
        .then(setAuthor)
        .catch(() => setHasError(true));
    }
  }, []);

  return (
    <>
      <div
        className="modal is-active"
        data-cy="modal"
      >
        <div className="modal-background" />
        {!author
          ? (
            <Loader />
          )
          : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #
                  {id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={handleClose}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {title}
                </p>

                <p className="block" data-cy="modal-user">
                  {completed
                    ? (<strong className="has-text-success">Done</strong>)
                    : (<strong className="has-text-danger">Planned</strong>)
                  }

                  {' by '}

                  {hasError
                    ? (<p>Oops! An error occurred while fetching the data.</p>)
                    : (
                      <a href={`mailto:${author?.email}`}>
                        {author?.name}
                      </a>
                    )}
                </p>
              </div>
            </div>
          )}
      </div>
    </>
  );
};
