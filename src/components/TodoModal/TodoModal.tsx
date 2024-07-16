import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeCurrentTodo } from '../../features/currentTodo';

type Props = {
  loading: boolean;
  setLoading: (condition: boolean) => void;
  setIsTodoModalShown: (condition: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({
  loading,
  setLoading,
  setIsTodoModalShown,
}) => {
  const [userData, setUserData] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setLoading(true);

    getUser(selectedTodo.userId)
      .then(data => {
        setUserData(data);
      })
      .finally(() => setLoading(false));
  }, [selectedTodo, setLoading]);

  const handleCloseButton = () => {
    setIsTodoModalShown(false);
    dispatch(removeCurrentTodo(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseButton}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">{userData?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
