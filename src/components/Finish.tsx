import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectors } from '../store';
import { loadActions } from '../store/loading';

type Props = {
  title: string;
};

export const Finish: React.FC<Props> = ({ title }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.isLoading);

  const handleClick = () => {
    dispatch(
      loadActions.finishLoading(),
    );
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
