import React, { FC } from 'react';
import { ErrorWarningProps } from '../typesDef';

export const ErrorWarning: FC<ErrorWarningProps> = ({
  data, solution
}) => {

  return (
    <div
      className="alert alert-warning text-center text-danger"
      role="alert"
    >
      <h3 className="text-center text-uppercase">
        {`Error during ${data} loading`}<br />{`Please ${solution}`}
      </h3>
    </div>
  );
};
