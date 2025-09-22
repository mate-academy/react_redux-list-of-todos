import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';

type Props = {
  currTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({ currTodo }) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const closeModal = () => {
    dispatch(currentTodoSlice.actions.setTodo(null));
  };

  useEffect(() => {
    if (currentTodo) {
      setIsLoading(true);
      getUser(currentTodo.userId).then(userData => {
        setUser(userData);
        setIsLoading(false);
      });
    }
  }, [currentTodo]);

  if (currTodo === null) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  currTodo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {currTodo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
