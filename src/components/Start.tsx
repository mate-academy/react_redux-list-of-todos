import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../store';
import './Start.scss';

type Props = {
  title: string;
};

const Start: React.FC<Props> = ({ title }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(actions.startLoading);
  };

  return (
    <button
      type="button"
      className="Start__button"
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Start;
