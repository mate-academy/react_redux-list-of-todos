import React from 'react';
import './TodoButton.css';

type Props = {
  handleClick: () => void;
  title: string;
  status: boolean;
}

export const TodoButton: React.FC<Props> = ({ title, handleClick, status }) => (
  <button
    type="button"
    className="todo__button"
    onClick={handleClick}
    disabled={status}
  >
    {status ? 'Loading...' : title}
  </button>
);
