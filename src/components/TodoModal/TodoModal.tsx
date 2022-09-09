import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>();
  const curToDo = useAppSelector(state => state.currentTodo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (curToDo) {
      getUser(curToDo.userId)
        .then(slectedUser => setUser(slectedUser));
    }
  }, [curToDo]);

  return (
    curToDo && (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {!curToDo && <Loader />}

        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {curToDo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setUser(null);
                dispatch(actions.removeTodo())}}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{curToDo.title}</p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {!curToDo.completed
                && <strong className="has-text-danger">Planned</strong>}

              {/* For completed */}
              {curToDo.completed
                && <strong className="has-text-success">Done</strong>}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      </div>
    )
  );
};
