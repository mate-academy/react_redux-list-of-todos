import React from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hook';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';
import { useDispatch } from 'react-redux';
import { User } from '../../types/User';

type Props = {
  user: User | null | undefined;
  setUser: (user: User) => void;
  loadingTodoModal: boolean;
};

export const TodoModal: React.FC<Props> = ({
  user,
  setUser,
  loadingTodoModal,
}) => {
  const dispatch = useDispatch();
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingTodoModal ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setUser(null);
                dispatch(setCurrentTodo(null));
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {/* For completed */}
              {' by '}
              <a
                // href="mailto:Sincere@april.biz"
                href={user?.email ? `mailto:${user.email}` : '#'}
              >
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
