import React, { useEffect, useState } from 'react';
// import { Loader } from '../Loader';
import { useAppDispatch } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [performer, setPerformer] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  const triggerTodo = () => {
    dispatch(currentTodoActions.deleteCurrentTodo(null));
  };

  useEffect(() => {
    getUser(todo.userId)
      .then(setPerformer)
      .catch(() => {
        throw new Error();
      })
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
              onClick={triggerTodo}
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
              <a href={`mailto:${performer?.email}`}>{performer?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
