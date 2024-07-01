/* eslint-disable */
import React from 'react';
import { TableHead } from '../TableHead';
import { TableBody } from '../TableBody';

export const TodoList: React.FC = () => {
  return (
    <table className="table is-narrow is-fullwidth">
      <TableHead />
      <TableBody />
    </table>
  );
};
