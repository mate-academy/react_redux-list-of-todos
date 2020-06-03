import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { isLoading } from '../store';
import { loadingAction } from '../store/loading';

type Props = {
  title: string;
  message: string;
};

export const Finish: React.FC<Props> = ({ title }) => {
  const dispatch = useDispatch(); // it is a link to `store.dispatch` method
  const loading = useSelector(isLoading); // we pass a link to selector function here

  const handleClick = () => {
    // action creator returns an action object
    // { type: 'FINISH_LOADING', message: 'the value of a message prop' }
    const action = loadingAction();

    // we dispatch an action to Redux
    dispatch(action);

    // it could be shortened to
    // dispatch(finishLoading(message));
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
