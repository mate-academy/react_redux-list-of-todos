import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { User } from '../../types/User';
import { actions as todoActions } from '../../features/currentTodo';
import { Loader } from '../Loader';
import { getUser } from '../../api';

const mapState = (state: RootState) => {
  const todo = state.currentTodo;

  return {
    todo,
  };
};

const mapDispatch = {
  removeTodo: todoActions.removeTodo,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const TodoModal: React.FC<Props> = ({
  todo,
  removeTodo,
}) => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!todo) {
      return;
    }

    getUser(todo?.userId)
      .then(res => setUserDetails(res))
      .catch(() => setError('Something went wrong'));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userDetails ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #3
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(removeTodo());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{todo?.title}</p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              {!error && (
                <a href={`mailto:${userDetails.email}`}>
                  {userDetails.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default connector(TodoModal);
