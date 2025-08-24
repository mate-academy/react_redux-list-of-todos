import React from 'react';

export const Loader: React.FC = () => (
  <div className="has-text-centered" data-cy="loader">
    <button className="button is-loading is-large is-white">Loading</button>
  </div>
);
