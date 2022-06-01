/* eslint-disable no-console */
import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { startLoading } from '../../store/LoadingReducer/actions';
import { isLoading } from '../../store/LoadingReducer/selectors';

type Props = {
  title: string; // a regular prop passed like <Start title="Start loading" />
};

export const Start: React.FC<Props> = ({ title }) => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  const handleClick = useCallback(() => {
    const action = startLoading();

    dispatch(action);
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
    >
      {title}
    </button>
  );
};
