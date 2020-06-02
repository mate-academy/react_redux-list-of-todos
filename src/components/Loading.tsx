import React from 'react';
import classNames from 'classnames/bind';

type Props = {
  loaded: boolean;
};

const Loading: React.FC<Props> = ({ loaded }) => (
  <div className={classNames({ 'lds-roller': !loaded }, { 'has-background-success': loaded })}>
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
