import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch } from '../../app/hook';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface Props {
  todo: Todo;
}

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const clear = () => {
    dispatch(currentTodoActions.clearTodo());
  };

  const [user, setUser] = useState<User>();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);

    getUser(todo.userId)
      .then(setUser)
      .finally(() => setLoader(false));
  }, [todo.userId]);

  function handleClose() {
    clear();
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
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
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
