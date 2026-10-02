import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
import { getUser } from '../../api';
import { Loader } from '../Loader';

interface Props {
  todo: Todo;
}

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const userData = await getUser(todo.userId);

        setUser(userData);
      } catch {
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [todo.userId]);

  const handleClose = () => {
    dispatch(setCurrentTodo(null));
  };

  return (
    <div
      className="modal is-active"
      data-cy="modal"
      style={{ display: 'block' }}
    >
      <div className="modal-background" onClick={handleClose} />
      <div className="modal-card">
        {/* 👇 Header now only contains the ID */}
        <header className="modal-card-head" data-cy="modal-header">
          Todo #{todo.id}
          <button
            data-cy="modal-close"
            className="delete"
            type="button"
            onClick={handleClose}
          />
        </header>

        <div className="modal-card-body">
          {/* 👇 Title moved here */}
          <p className="modal-card-title" data-cy="modal-title">
            {todo.title}
          </p>

          <p>Status: {todo.completed ? 'Completed' : 'Not completed'}</p>

          {loading ? (
            <Loader />
          ) : (
            user && (
              <p data-cy="modal-user">
                {todo.completed ? 'Done by' : 'Planned by'} {user.name}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};
