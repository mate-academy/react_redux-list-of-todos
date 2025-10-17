import React from 'react';
import { ModalCard } from '../ModalCard';

type Props = {
  modal: boolean;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ modal, onClose }) => {
  return <>{modal && <ModalCard onClose={onClose} />}</>;
};
