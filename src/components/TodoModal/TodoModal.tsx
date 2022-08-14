import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUsers } from '../../api';
import { useAppSelector } from '../../store';
import { actions as loadingActions } from '../../store/loading';
import { actions as todoActions } from '../../store/currentTodo';

type Props = {
  todo: Todo,
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const dispatch = useDispatch();
  const isLoading = useAppSelector(state => state.loading);

  useEffect(() => {
    dispatch(loadingActions.startLoading());

    getUsers()
      .then(usersFromServer => {
        setUsers([...usersFromServer]);
      })
      .finally(() => dispatch(
        loadingActions.finishLoading(),
      ));
  }, []);

  const currentUser = users?.find(user => user.id === todo.userId);

  return (
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
              {`Todo #${todo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(todoActions.deleteTodo());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className="has-text-danger">Planned</strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {currentUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
