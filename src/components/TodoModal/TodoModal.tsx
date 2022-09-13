import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Loader } from '../Loader';

import { actions, selectors } from '../../store';

import { getUser } from '../../api';

import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTodo = useSelector(selectors.selectedTodo);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    getUser(selectedTodo.userId)
      .then(setUser);
  }, [selectedTodo]);

  const handleCloseTodo = () => dispatch(actions.selectTodo(null));

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user || !selectedTodo ? (
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

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Select todo"
              onClick={handleCloseTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                selectedTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )
              }

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
