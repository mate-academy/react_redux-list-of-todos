import React from 'react';
import { Loader } from '../Loader';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { closeModal } from './modalSlice';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(state => state.modal.isOpen);
  const isLoading = useAppSelector(state => state.todos.loading);
  const selectedTodoId = useAppSelector(state => state.modal.selectedTodoId);
  const users = useAppSelector(state => state.users.users);
  const todos = useAppSelector(state => state.todos.todos);
  const selectedTodo = todos.find(todo => todo.id === selectedTodoId);
  const user = selectedTodo ? users[selectedTodo.userId] : null;

  return isModalOpen ? (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{selectedTodoId}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            onClick={() => dispatch(closeModal())}
            type="button"
            className="delete"
            data-cy="modal-close"
          >
            Close
          </button>
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            fugiat veniam minus
          </p>

          <p className="block" data-cy="modal-user">
            {user ? (
              <>
                Assigned to: <strong>{user.name}</strong>
                <br />
                Email: <a href={`mailto:${user.email}`}>{user.email}</a>
              </>
            ) : (
              'Loading user info...'
            )}
          </p>
        </div>
      </div>
    </div>
  ) : null;
};
