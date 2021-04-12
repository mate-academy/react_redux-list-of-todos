import React from 'react';
import { useSelector } from 'react-redux';

import { getLoadUserError } from '../../store';

export const NoUserSelected = () => {
  const errorText: string = useSelector(getLoadUserError);

  return (
    <h3 className="error">{errorText}</h3>
  );
};
