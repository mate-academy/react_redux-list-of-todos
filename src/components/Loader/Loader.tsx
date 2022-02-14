import React from 'react';
import './Loader.scss';

export const Loader: React.FC = () => (
  <div className="loader-container">
    <div className="lds-spinner">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);
