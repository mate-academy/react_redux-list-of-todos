import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import { clearCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';

export const TodoModal: React.FC = () => {
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      if (currentTodo) {
        const userData = await getUser(currentTodo?.userId);

        setUser(userData);
      }

      setIsLoading(false);
    };

    fetchUser();
  }, [currentTodo]);

  const closeModal = () => {
    dispatch(clearCurrentTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #3
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              fugiat veniam minus
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              <strong className="has-text-danger">Planned</strong>

              {/* For completed */}
              <strong className="has-text-success">Done</strong>
              {' by '}
              <a href="mailto:Sincere@april.biz">Leanne Graham</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
