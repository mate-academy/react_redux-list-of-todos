import React from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';

import { Todo } from '../../types/Todo';

export const TodoModal: React.FC<{
  selectedTodo: Todo;
  selectedUser: User | null;
  isUserLoading: boolean;
  onClose: () => void;
}> = ({ selectedTodo, selectedUser, isUserLoading, onClose }) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isUserLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {'Todo #' + selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => onClose()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>
            {selectedUser && (
              <p className="block" data-cy="modal-user">
                <strong
                  className={
                    selectedTodo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {selectedTodo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${selectedUser.email}`}>{selectedUser.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
