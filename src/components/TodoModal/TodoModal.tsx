/* eslint-disable max-len */
import React, { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

import { Loader } from '../Loader';

type Props = {
  currentTodo: Todo,
};

export const TodoModal: React.FC<Props> = ({ currentTodo }) => {
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);
  const [loader, setLoader] = useState(false);

  const getUserData = async () => {
    if (currentTodo) {
      setLoader(true);
      const userFromServer = await getUser(currentTodo.userId);

      try {
        setUser(userFromServer);
      } finally {
        setLoader(false);
      }
    }
  };

  useLayoutEffect(() => {
    getUserData();
  }, []);

  const { id, title, completed } = currentTodo ?? {};
  const { name, email } = user ?? {};

  const hideTodo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader ? <Loader /> : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={hideTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{title}</p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${email}`}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
