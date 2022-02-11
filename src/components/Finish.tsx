import React from 'react';
import { useSelector } from 'react-redux';

import { isLoading } from '../store';

type Props = {
  title: string;
  message: string;
};

export const Finish: React.FC<Props> = () => {
  const loading = useSelector(isLoading); // we pass a link to selector function here

  const handleClick = () => {
    // action creator returns an action object
    // { type: 'FINISH_LOADING', message: 'the value of a message prop' }
    // const action = finishLoading(message);

    // we dispatch an action to Redux
    // dispatch(action);

    // it could be shortened to
    // dispatch(finishLoading(message));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!loading}
    >
      {}
    </button>
  );
};
