import React from 'react';
import classNames from 'classnames/bind';

type Props = {
  isLoaded: boolean;
};

const Loading: React.FC<Props> = ({ isLoaded }) => (
  <div className={classNames({ 'lds-roller': !isLoaded }, { 'has-background-success': isLoaded })}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default Loading;
