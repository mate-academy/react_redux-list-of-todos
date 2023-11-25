import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser, getTodos } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  selectUser: number
  selectTodo: number,
  selectItems: (UserId: number, todoId: number) => void,
};

export const TodoModal: React.FC<Props> = ({
  selectUser,
  selectTodo,
  selectItems,
}) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<undefined | User>();
  const todo = useAppSelector(state => state.currentTodo);
  const setTodo = (newTodo: Todo | undefined) => {
    if (!newTodo) {
      return null;
    }

    return dispatch(currentTodoActions.setTodo(newTodo));
  };

  const deleteTodo = () => dispatch(currentTodoActions.removeTodo());

  const handleDelete = () => {
    selectItems(0, 0);
    deleteTodo();
  };

  useEffect(() => {
    getUser(selectUser).then(res => setUser(res));
    getTodos().then(res => setTodo(res.find(el => el.id === selectTodo)));
  }, [selectUser]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleDelete}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={classNames({
                'has-text-danger': !todo?.completed,
                'has-text-success': todo?.completed,
              })}
              >
                {todo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
