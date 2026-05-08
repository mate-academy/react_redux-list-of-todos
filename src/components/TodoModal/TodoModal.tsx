import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  const onCloseModal = () => {
    dispatch(currentTodoSlice.actions.cleanCurrentTodo());
  };

  useEffect(() => {
    getUser(todo.userId)
      .then(setUser)
      .catch(error => error.message)
      .finally(() => setLoader(false));
  }, [todo.userId]);

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
              onClick={() => onCloseModal()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames([
                  {
                    'has-text-success': todo.completed,
                    'has-text-danger': !todo.completed,
                  },
                ])}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
