import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { clearCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [load, setLoad] = useState(false)

  const dispatch = useDispatch()
  const { currentTodo } = useAppSelector(state => state.currentTodo)
  const { id, title, completed, userId } = currentTodo ?? {
    id: 0,
    userId: 0,
    title: '',
    completed: false
  }

  const closeModal = () => {
    dispatch(clearCurrentTodo(null))
  }

  useEffect(() => {
    setLoad(true)

    getUser(userId)
      .then(setUser)
      .finally(() => setLoad(false))
  }, [])

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {load && <Loader />}

      {!load && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button type="button" className="delete" data-cy="modal-close" onClick={closeModal} />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {!completed && <strong className="has-text-danger">Planned</strong>}

              {/* For completed */}
              {completed && <strong className="has-text-success">Done</strong>}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
