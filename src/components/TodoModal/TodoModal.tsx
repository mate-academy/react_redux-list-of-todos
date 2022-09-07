import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface Props {
  selectedTodo: Todo,
}

export const TodoModal: React.FC<Props> = (props) => {
  const { selectedTodo } = props;
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(res => setUser(res));
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user
        ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(currentTodoActions.removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p
                className="block"
                data-cy="modal-title"
              >
                {selectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo.completed
                  ? <strong className="has-text-danger">Planned</strong>
                  : <strong className="has-text-success">Done</strong>}

                {' by '}
                <a href="mailto:Sincere@april.biz">{user?.name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
