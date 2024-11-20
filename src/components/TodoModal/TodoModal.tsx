import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as todosActions from '../../features/todos';
import * as userActions from '../../features/users';

type Props = {
  selectedTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo }) => {
  const dispatch = useAppDispatch();
  const { user, loaded } = useAppSelector(state => state.user);

  const handleSelectedTodo = (todo: Todo | null) => {
    dispatch(todosActions.setSelectedTodo(todo));
  };

  useEffect(() => {
    if (selectedTodo?.userId) {
      dispatch(userActions.init(selectedTodo.userId));
    }
  }, [dispatch, selectedTodo?.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loaded ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleSelectedTodo(null)}
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
              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
