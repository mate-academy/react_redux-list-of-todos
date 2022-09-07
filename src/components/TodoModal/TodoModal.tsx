import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../../store';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { SetSelectedTodoActionCreator } from '../../store/selectedTodo';

export const TodoModal: React.FC = () => {
  const todos = useSelector(selectors.getTodos);
  const selectedTodoID = useSelector(selectors.getSelectedTodo);
  const decpatch = useDispatch();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const {
    id,
    title,
    completed,
    userId,
  } = useMemo(() => todos.find(todo => todo.id === selectedTodoID) as Todo,
    [selectedTodoID, todos]);

  useEffect(() => {
    getUser(userId)
      .then(setUserInfo);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userInfo ? (
        <Loader />
      ) : (
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
              onClick={() => decpatch(SetSelectedTodoActionCreator(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              <a href={`mailto:${userInfo.email}`}>
                {userInfo.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
