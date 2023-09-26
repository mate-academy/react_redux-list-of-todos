import React from 'react';
import { Loader } from '../Loader';
import { RemoveTodoAction } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo;
  selectedUser: User | null;
  removeSelectedUser: () => RemoveTodoAction;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  selectedUser,
  removeSelectedUser,
}) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser && <Loader />}

      {selectedUser && (
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
              onClick={removeSelectedUser}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{selectedTodo.title}</p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {!selectedTodo.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {/* For completed */}
              {selectedTodo.completed && (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href={`mailto:${selectedUser.email}`}>{selectedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
