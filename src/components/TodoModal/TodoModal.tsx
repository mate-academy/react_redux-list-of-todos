import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { actions as userActions } from '../../features/user';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  selectedTodo: Todo,
};

export const TodoModal: React.FC<Props> = ({ selectedTodo }) => {
  const user = useAppSelector(state => state.user);
  const dispatch = useDispatch();
  const { setUser, removeUser } = userActions;

  const {
    id,
    title,
    completed,
  } = selectedTodo;

  useEffect(() => {
    const loadUser = async () => {
      const response = await getUser(selectedTodo.userId);

      dispatch(setUser(response));
    };

    loadUser();

    return () => {
      dispatch(removeUser());
    };
  }, []);

  const handlerRemoveTodo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handlerRemoveTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
