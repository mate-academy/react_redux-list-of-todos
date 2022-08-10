import React from 'react';
import { useDispatch } from 'react-redux';
import { selectors, useAppSelector } from '../store';
import { actions } from '../store/_loading';

type Props = {
  title: string;
};

export const Start: React.FC<Props> = ({ title }) => {
  const dispatch = useDispatch();
  const loading = useAppSelector(selectors.isLoading);

  return (
    <button
      type="button"
      className="button is-dark"
      onClick={() => {
        const action = actions.startLoading();

        dispatch(action);
      }}
      disabled={loading}
    >
      {title}
    </button>
  );
};
