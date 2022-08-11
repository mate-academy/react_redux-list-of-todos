/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { useAppSelector } from '../../store';
import { action as SelectedAction } from '../../store/selectedTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  userId: number;
};

export const TodoModal: React.FC<Props> = ({ userId }) => {
  const [users, setUsers] = useState<User>();
  const dispatch = useDispatch();
  const todo = useAppSelector(state => state.selectedTodo);

  useEffect(() => {
    getUser(userId).then(usersFromServer => {
      setUsers(usersFromServer);
    });
  }, []);

  return (todo && (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => {
          dispatch(SelectedAction.remove());
        }}

      />

      {!users ? (
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
                dispatch(SelectedAction.remove());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}
              {' by '}

              <a href={`mailto:${users.email}`}>
                {users?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  ));
};
