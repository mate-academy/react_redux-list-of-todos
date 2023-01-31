import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as currTodoActions } from '../../features/currentTodo';

export const ButtonModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleDeleteTodo = () => {
    dispatch(currTodoActions.removeTodo());
  };

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      className="delete"
      data-cy="modal-close"
      onClick={handleDeleteTodo}
    />
  );
};
