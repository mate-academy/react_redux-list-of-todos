import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currUser, setCurrUser] = useState<User | null>(null);
  const currTodo = useSelector(
    (state: RootState) => state.currentTodo,
  ) as Todo | null;

  useEffect(() => {
    const fetchUser = async () => {
      if (!currTodo) {
        return;
      }

      try {
        setIsLoading(true);
        const user = await getUser(currTodo.userId);

        setCurrUser(user);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [currTodo]);

  if (!currTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading && !error ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(currentTodoSlice.actions.currentTodo(null));
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currTodo.title}
            </p>
            <p className="block" data-cy="modal-user">
              {currTodo.completed ? (
                // eslint-disable-line no-nested-ternary
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href="mailto:Sincere@april.biz">{currUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
