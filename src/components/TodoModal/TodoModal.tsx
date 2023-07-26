import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppDispatch } from '../../app/hooks';

type Props = {
  todo: Todo;
};

type TodoWithUser = Todo & { user: User };

export const TodoModal: React.FC<Props> = ({
  todo,
}) => {
  const [todoWithUser, setTodoWithUser] = useState<TodoWithUser | null>(null);
  const dispatch = useAppDispatch();

  const loadUserAndSetTodo = async () => {
    const user = await getUser(todo.userId);

    setTodoWithUser({
      ...todo,
      user,
    });
  };

  useEffect(() => {
    loadUserAndSetTodo();
  }, []);

  const onCloseModal = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todoWithUser
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todoWithUser.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={onCloseModal}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todoWithUser.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todoWithUser.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${todoWithUser.user.email}`}>
                  {todoWithUser.user.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
