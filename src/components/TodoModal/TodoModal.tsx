/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import Loader from '../Loader';

import User from '../../types/User';

import { loadTodo, selectors } from '../../store';
import { actions as currentTodoActions } from '../../store/currentTodo';

import { getUser } from '../../api/user';

const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const {
    todo,
    error: isError,
    loading: isLoading,
  } = useSelector(selectors.currentTodo);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    dispatch(currentTodoActions.setLoading(true));

    dispatch(loadTodo(todo.id));
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      const userFromServer = await getUser(todo.userId);

      setUser(userFromServer);
    };

    if (todo.userId) {
      loadUser()
        .catch(() => dispatch(currentTodoActions.setError(true)))
        .finally(() => dispatch(currentTodoActions.setLoading(false)));
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading
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
                {`Todo #${todo.id}`}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(currentTodoActions.resetTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {!isError && user
                  ? (
                    <>
                      <strong
                        className={classNames({
                          'has-text-success': todo.completed,
                          'has-text-danger': !todo.completed,
                        })}
                      >
                        {todo.completed ? 'Done' : 'Planned'}
                      </strong>

                      {' by '}

                      <a href={`mailto:${user.email}`}>
                        {user.name}
                      </a>
                    </>
                  )
                  : (
                    <strong className="has-text-danger">
                      Error has occurred
                    </strong>
                  )}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};

export default TodoModal;
