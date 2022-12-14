import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  todo: Todo;
};

type User = {
  email: string;
  name: string;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [user, setUser] = useState<User>({
    email: '',
    name: '',
  });

  const { name, email } = user;
  const {
    id,
    completed,
    userId,
    title,
  } = todo;

  useEffect(() => {
    getUser(userId)
      .then(data => setUser(data));
  }, []);

  const dispatch = useAppDispatch();
  const removeTodo = () => dispatch(currentTodoActions.removeTodo());

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {
        !name
          ? <Loader />
          : (
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
                  onClick={removeTodo}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">{title}</p>
                <p className="block" data-cy="mo dal-user">
                  {
                    completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>
                  }
                  {' by '}
                  <a href={`mailto:${email}`}>{name}</a>
                </p>
              </div>
            </div>
          )
      }
    </div>
  );
};
