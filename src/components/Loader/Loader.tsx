import React from 'react';
import './Loader.scss';

export const Loader: React.FC = React.memo(() => (
  <div className="lds-roller">
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
));
