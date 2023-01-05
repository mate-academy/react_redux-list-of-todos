import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [todo, setTodo] = useState<Todo | null>();
  const [loading, setLoading] = useState(true);

  const selectedTodo = useAppSelector(store => store.currentTodo);
  const dispatch = useAppDispatch();

  const getUserFromServer = async () => {
    let selectedUser;

    if (selectedTodo) {
      selectedUser = await getUser(selectedTodo?.userId);
    }

    setUser(selectedUser);
  };

  const buttonHandler = () => {
    if (selectedTodo) {
      dispatch(actions.removeTodo());
    }

    setTodo(null);
  };

  useEffect(() => {
    getUserFromServer();
    setTodo(selectedTodo);

    if (selectedTodo) {
      setLoading(true);
    }
  }, [selectedTodo]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, [loading]);

  return (
    <>
      {todo && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          {loading && (<Loader />)}

          {!loading && (
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
                  onClick={buttonHandler}
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
                  <a href={user?.email}>{user?.name}</a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
