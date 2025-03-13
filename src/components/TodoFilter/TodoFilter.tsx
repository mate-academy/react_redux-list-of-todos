import React from 'react';
import { StatusControl } from './components/StatusControl';
import { QueryControl } from './components/QueryControl';

export const TodoFilter: React.FC = () => (
  <form className="field has-addons" onSubmit={event => event.preventDefault()}>
    <StatusControl />
    <QueryControl />
  </form>
);
