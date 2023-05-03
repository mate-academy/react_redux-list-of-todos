import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as todoActions } from '../../features/currentTodo';

interface Props {
  todo: Todo;
}

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const testTodo = useAppSelector(state => state.currentTodo);

  // eslint-disable-next-line no-console
  console.log(testTodo);

  const { id, title, completed } = todo;

  const [user, setUser] = useState<User | null>(null);
  const fetchedUser = async () => {
    try {
      const data = await getUser(todo.userId);

      setUser(data);
    } catch (error) {
      throw new Error('Sorry, something goes wrong. Please, try again later');
    }
  };

  useEffect(() => {
    fetchedUser();
  }, [todo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user ? (
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
              onClick={() => dispatch(todoActions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">

              {completed
                ? (
                  <strong className="has-text-success">Done</strong>
                )
                : (
                  <strong className="has-text-danger">Planned</strong>
                )}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user && (user.name)}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
