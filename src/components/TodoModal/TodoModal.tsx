import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import { currentTodoReducer } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal = ({ todo }: { todo: Todo }) => {
  const dispatch = useDispatch();
  const resetModal = () => dispatch(currentTodoReducer(null));

  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(todo.userId)
      .then(setUser)
      .finally(() => {
        setIsLoading(false);
      });
  }, [todo.userId]);

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
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={resetModal}
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
              <a href="mailto:Sincere@april.biz">{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
