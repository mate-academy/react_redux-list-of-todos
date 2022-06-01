/* eslint-disable no-console */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { finishLoading } from '../../store/LoadingReducer/actions';
import { isLoading } from '../../store/LoadingReducer/selectors';

type Props = {
  title: string;
  message: string;
};

export const Finish: React.FC<Props> = ({ title, message }) => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  const handleClick = () => {
    const action = finishLoading(message);

    dispatch(action);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!loading}
    >
      {title}
    </button>
  );
};
