import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { ExtendedTodo } from '../../types/ExtendedTodo';
import { getUser } from '../../api';
import { clearSelected } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const currentTodoDispatch = useDispatch<AppDispatch>();
  const [extendedTodo, setExtendedTodo] = useState<ExtendedTodo | null>(null);

  useEffect(() => {
    if (!selectedTodo) {
      return setExtendedTodo(null);
    }

    const loadUser = async () => {
      try {
        const user = await getUser(selectedTodo.userId);

        setExtendedTodo({ ...selectedTodo, user });
      } catch (e) {
        setExtendedTodo(null);
      }
    };

    loadUser();
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!extendedTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{extendedTodo.id}
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => currentTodoDispatch(clearSelected())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {extendedTodo.title}
            </p>
            <p className="block" data-cy="modal-user">
              {extendedTodo.completed === false ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href={`mailto:${extendedTodo.user.email}`}>
                {extendedTodo.user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
