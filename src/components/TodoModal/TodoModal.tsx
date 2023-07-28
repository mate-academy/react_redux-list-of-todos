import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo, User } from '../../types';
import { getUser } from '../../api';
import { useAppDispatch } from '../../app/hooks';
import { actions as selectTodoActions } from '../../features/currentTodo';

type Props = {
  selectedTodo: Todo;
};

export const TodoModal: FC<Props> = ({ selectedTodo }) => {
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(data => setUser(data))
      .catch(err => {
        throw new Error(err);
      });
  }, []);

  const onModalClose = () => {
    dispatch(selectTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
