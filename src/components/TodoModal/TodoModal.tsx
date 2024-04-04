import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { RootState } from '../../app/store';
import { actions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoModal: React.FC<Props> = ({ setModal }) => {
  const [user, setUser] = useState<User>();
  const dispatch = useDispatch();
  const todo: Todo | null = useSelector(
    (state: RootState) => state.currentTodo,
  );

  const handleDeleteTodo = () => {
    dispatch(actions.removeTodo());
    setModal(false);
  };

  useEffect(() => {
    if (!todo) {
      return;
    }

    getUser(todo?.userId).then(data => setUser(data));
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todo && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo?.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleDeleteTodo}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {!todo?.completed ? (
              <strong className="has-text-danger">Planned</strong>
            ) : (
              <strong className="has-text-success">Done</strong>
            )}
            {' by '}
            <a href={`mailto:${user?.email}`}>{user?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
