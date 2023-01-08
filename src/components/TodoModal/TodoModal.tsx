import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Loader } from '../Loader';

type Props = {
  todos: Todo[],
  selectTodo: (todo: null) => void,
  selectedTodoId: number,
};

export const TodoModal: React.FC<Props> = ({
  todos,
  selectTodo,
  selectedTodoId,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);

  useEffect(() => {
    if (selectedTodo) {
      const fetchUser = async () => {
        setUser(await getUser(selectedTodo.userId));
      };

      fetchUser();
    }
  }, []);

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
              {`Todo #${selectedTodoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => selectTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

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
