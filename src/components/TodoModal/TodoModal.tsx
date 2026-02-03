/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const selectedTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      setLoading(true);
      getUser(selectedTodo.userId)
        .then(response => {
          setUser(response);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading || !selectedTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(setCurrentTodo(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!selectedTodo.completed ? (
                <>
                  {/* For not completed */}
                  <strong className="has-text-danger">Planned</strong>
                </>
              ) : (
                <>
                  {/* For completed */}
                  <strong className="has-text-success">Done</strong>
                </>
              )}
              {' by '}
              <a href="mailto:Sincere@april.biz">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
