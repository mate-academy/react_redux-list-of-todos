import { Todo } from '../types/Todo';
import { User } from '../types/User';

type Props = {
  todo: Todo | null;
  user: User | null;
  loading: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  user,
  loading,
  onClose,
}) => {
  if (!todo) return null;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" data-cy="modal-header">
            Todo #{todo.id}
          </p>

          <button
            className="delete"
            data-cy="modal-close"
            onClick={onClose}
          />
        </header>

        <section className="modal-card-body">
          <p data-cy="modal-title">{todo.title}</p>

          {loading && (
            <div data-cy="loader">Loading user...</div>
          )}

          {!loading && user && (
            <div data-cy="modal-user">
              {todo.completed
                ? `Done by ${user.name}`
                : `Planned by ${user.name}`}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};