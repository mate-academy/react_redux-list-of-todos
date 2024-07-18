import React from 'react';
import { Loader } from '..';
import { useAppSelector } from '../../app/hooks';
import { ModalCard } from '../ModalCard';

type Props = {
  onCloseModal: () => void;
};

export const TodoModal: React.FC<Props> = ({ onCloseModal }) => {
  const { loading } = useAppSelector(state => state.currentTodo);

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {loading && <Loader />}

        {!loading && <ModalCard onCloseModal={onCloseModal} />}
      </div>
    </>
  );
};
