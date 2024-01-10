import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch } from '../../app/hooks';
import { actions as modalActions } from '../../features/currentTodo';

type Props = {
  // setModalId: (a: number | undefined) => void,
  mainTodo: Todo,
};

export const TodoModal: React.FC<Props> = ({ mainTodo }) => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<undefined | User>(undefined);

  const dispatch = useAppDispatch();
  const removeModal = () => {
    dispatch(modalActions.removeTodo());
  };

  const loadUser = useCallback(() => {
    getUser(mainTodo.userId)
      .then(userFromServer => {
        setUser(userFromServer);
      })
      .then(() => {
        setLoader(false);
      });
  }, [mainTodo]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${mainTodo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => removeModal()}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">fugiat veniam minus</p>

              <p className="block" data-cy="modal-user">
                {/* For not completed */}
                {mainTodo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}
                {/* For completed */}

                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
