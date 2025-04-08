import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { setCurrentTodo } from '../../features/currentTodo';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { useUserData } from '../../hooks/useUserData';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { user, isLoading } = useUserData(currentTodo);

  if (!currentTodo) {
    return null;
  }

  const handleClose = () => {
    dispatch(setCurrentTodo(null));
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleClose} />

      {isLoading && <Loader isLoading={true} />}

      <div className="modal-card">
        <ModalHeader todoId={currentTodo.id} onClose={handleClose} />

        <ModalBody
          todo={currentTodo}
          userName={user?.name}
          userEmail={user?.email}
        />
      </div>
    </div>
  );
};
