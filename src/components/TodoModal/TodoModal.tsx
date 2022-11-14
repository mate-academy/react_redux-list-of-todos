import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todoId: number;
  todos: Todo[];
  setTodoId: (id: number) => number | void;
};

export const TodoModal: React.FC<Props> = ({
  todoId,
  todos,
  setTodoId,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalCardOpen, setIsModalCardOpen] = useState(true);
  const selectedTodo = todos.find(({ id }) => id === todoId);

  const loadUsers = async () => {
    if (selectedTodo) {
      const usersFromServer = await getUser(selectedTodo.userId);

      setUser(usersFromServer);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (!isModalCardOpen) {
    return null;
  }

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
              {`Todo #${todoId}`}
            </div>

            <button
              aria-label="delete"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setIsModalCardOpen(false);
                setTodoId(0);
              }}
            />

          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames(
                'has-text-success',
                {
                  'has-text-danger': !selectedTodo?.completed,
                },
              )}
              >
                {
                  selectedTodo?.completed
                    ? 'Done'
                    : 'Planned'
                }
              </strong>

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
