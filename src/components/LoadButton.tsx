import React from 'react';
import { useSelector } from 'react-redux';
import { isLoading } from '../store';


type Props = {
  title: string;
  init: () => void;
};

const LoadButton: React.FC<Props> = ({ init, title }) => {

const loading = useSelector(isLoading);

  return (
    <button
      className="start-btn"
      type="button"
      onClick={init}
      disabled={loading}
    >
      {title}
    </button>
  );
};

export default LoadButton;
