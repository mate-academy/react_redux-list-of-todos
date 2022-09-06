import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api';
import { RootState } from '../../app/store';
import { currentTodoActions } from '../../features/currentTodo';
import { loaderActions } from '../../features/loading';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const currTodo = useSelector((state: RootState) => state.currentTodo);
  const loading = useSelector((state: RootState) => state.loading);
  const [user, setUser] = useState<User>();

  const closeTodo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  useEffect(() => {
    if (currTodo) {
      dispatch(loaderActions.setTodoLoading());
      getUser(currTodo.userId)
        .then((currUser: User) => setUser(currUser))
        .finally(() => dispatch(loaderActions.removeTodoLoading()));
    }
  }, []);

  return (
    currTodo
      ? (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {loading.todoLoading ? (
            <Loader />
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #
                  {currTodo.id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => (closeTodo())}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {currTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {currTodo.completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>}
                  {' by '}

                  {user && (
                    <a href={`mailto:${user.email}`}>
                      {user.name}
                    </a>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : <></>
  );
};
