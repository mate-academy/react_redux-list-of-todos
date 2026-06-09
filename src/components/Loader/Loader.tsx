import React from 'react';
import './Loader.scss';

type Props = {
  isLoaded: boolean;
};

export const Loader: React.FC<Props> = ({ isLoaded }) =>
  isLoaded && (
    <div className="Loader" data-cy="loader">
      <div className="Loader__content" />
    </div>
  );
