import cn from 'classnames';
import React from 'react';
import { Loader } from '..';
import { ModalCard } from '../ModalCard';

type Props = {
  onCloseModal: () => void;
  showModal: boolean;
  loading: boolean;
};

export const TodoModal: React.FC<Props> = ({
  onCloseModal,
  showModal,
  loading,
}) => {
  return (
    <>
      <div
        className={cn('modal', {
          'is-active': showModal,
        })}
        data-cy="modal"
      >
        <div className="modal-background" />

        {loading && <Loader />}

        {!loading && <ModalCard onCloseModal={onCloseModal} />}
      </div>
    </>
  );
};
