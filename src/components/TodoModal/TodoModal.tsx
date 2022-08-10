import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions } from '../../store/currentTodo';
import { selectors } from '../../store';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();

  const dispatch = useDispatch();
  const selectedTodo = useSelector(selectors.getTodo);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then(userInfo => {
        setIsLoading(false);
        setUser(userInfo);
      });
    }
  }, []);

  return (
    <>
      {selectedTodo && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {isLoading ? (
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

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => dispatch(actions.unselectTodo())}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {selectedTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {selectedTodo.completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>}

                  {' by '}

                  <a href="mailto:Sincere@april.biz">
                    {user?.name}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
