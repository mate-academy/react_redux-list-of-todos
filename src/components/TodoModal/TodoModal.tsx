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
  const handleClose = () => dispatch(currentTodoActions.removeTodo());

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(setAuthor);
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
                  {currentTodo?.id}
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
                  {currentTodo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {currentTodo?.completed
                    ? (<strong className="has-text-success">Done</strong>)
                    : (<strong className="has-text-danger">Planned</strong>)}

                  {' by '}

                  <a href={`mailto:${author?.email}`}>
                    {author?.name}
                  </a>
                </p>
              </div>
            </div>
          )}
      </div>
    </>
  );
};
