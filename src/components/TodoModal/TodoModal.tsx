import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  setOpenTodoId: (id: number | null) => void;
};

export const TodoModal: React.FC<Props> = ({ setOpenTodoId }) => {
  const dispatch = useDispatch();
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const deleteCurrentTodo = () => {
    dispatch(setCurrentTodo(null));
  };

  useEffect(() => {
    if (!currentTodo) {
      return;
    }
    setLoading(true);
    getUser(currentTodo.userId)
      .then((user) => {
        setSelectedUser(user);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser && loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                deleteCurrentTodo();
                setOpenTodoId(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo?.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href={`mailto:${selectedUser?.email}`}>{selectedUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
