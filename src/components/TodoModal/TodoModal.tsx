import React from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { setSelectedTodo } from '../../features/todos';
import { useDispatch } from 'react-redux';

type Props = {
  todo: Todo | null;
  loading: boolean;
  user: User | null;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  loading,
  user,
  setIsModalOpen,
  isModalOpen,
}) => {
  const dispatch = useDispatch();

  if (!todo && !loading) {
    return null;
  }

  return (
    isModalOpen && (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {loading ? (
          <Loader />
        ) : (
          <div className="modal-card" key={todo?.id}>
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  setIsModalOpen(false);
                  dispatch(setSelectedTodo(null));
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={`has-text-${todo?.completed ? 'success' : 'danger'}`}
                >
                  {todo?.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    )
  );
};
