import React from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';

type Props = {
  todoUser?: User;
};

export const TodoModal: React.FC<Props> = ({ todoUser }) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handlerModalClose = () => {
    dispatch(actions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {currentTodo && todoUser ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handlerModalClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {currentTodo.completed && (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}
              <a href={todoUser?.email}>{todoUser?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
