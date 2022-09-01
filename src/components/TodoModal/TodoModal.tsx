import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { selectors } from '../../store';
import { actions } from '../../store/currentTodo';

export const TodoModal = () => {
  const selectedTodo = useSelector(selectors.getTodo);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then(user => setSelectedUser(user));
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(actions.unsetTodo());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${selectedUser.email}`}>
                {selectedUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
