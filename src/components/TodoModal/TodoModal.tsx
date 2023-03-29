import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { actions as ActionCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [userName, setUserName] = useState<User>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const result = await getUser(currentTodo?.userId as number);

      setUserName(result);
    })();
  }, [currentTodo]);

  const close = () => {
    dispatch(ActionCurrentTodo.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userName
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {`${currentTodo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={close}
              />
            </header>

            <div className="modal-card-body">
              <p
                className="block"
                data-cy="modal-title"
              >
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* For not completed */}
                {!currentTodo?.completed
          && <strong className="has-text-danger">Planned</strong>}

                {/* For completed */}
                {currentTodo?.completed
          && <strong className="has-text-success">Done</strong>}
                {' by '}
                <a
                  href="mailto:Sincere@april.biz"
                >
                  {userName && userName.name}
                </a>
              </p>
            </div>
          </div>
        )}

    </div>
  );
};
