import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';

type Props = {
  setModel: (isOpen: boolean) => void,
};

export const TodoModal: React.FC<Props> = ({ setModel }) => {
  const [selectedUser, setSelectedUser] = useState<User>();
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const currentTodo
    = useAppSelector(state => state.currentTodo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then((userFromServer) => {
          setSelectedUser(userFromServer);
          setIsLoadingUser(false);
        });
    }
  }, [currentTodo]);

  const closeTodoModel = () => {
    dispatch(currentTodoActions.removeTodo());
    setModel(false);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {
        isLoadingUser ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${currentTodo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={closeTodoModel}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong className={currentTodo?.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {currentTodo?.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`"mailto:${selectedUser?.email}`}>
                  {selectedUser?.name}
                </a>
              </p>
            </div>
          </div>
        )
      }
    </div>
  );
};
