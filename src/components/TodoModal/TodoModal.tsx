import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedTodo } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  loading: boolean;
  user: User | null;
};

export const TodoModal = ({ loading, user }: Props) => {
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(setSelectedTodo(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleCloseModal}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
