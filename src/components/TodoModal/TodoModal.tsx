import React, { useEffect, useState, MouseEvent } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { actions as curentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const curentTodo: Todo | null = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();
  const removeTodo = () => (dispatch(curentTodoActions.removeTodo()));

  const removeHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeTodo();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (curentTodo) {
          const user = await getUser(curentTodo.userId);

          setUserName(user.name);
        }
      } catch (error) {
        throw new Error();
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {userName && curentTodo
        ? (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${curentTodo.id}`}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                aria-label="Close modal button"
                onClick={removeHandler}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{curentTodo.title}</p>

              <p className="block" data-cy="modal-user">
                {curentTodo.completed
                  ? (
                    <strong className="has-text-success">Done</strong>
                  )
                  : (
                    <strong className="has-text-danger">Planned</strong>
                  )}
                {' by '}
                <a href="mailto:Sincere@april.biz">{userName}</a>
              </p>
            </div>
          </div>
        ) : (
          <Loader />
        )}
    </div>
  );
};
