import React from 'react';
import { useSelector } from 'react-redux';

import { getErrorText } from '../../store';

export const ErrorOnLoad = () => {
  const errorText: string = useSelector(getErrorText);

  return (
    <h3 className="error">{errorText}</h3>
  );
};
