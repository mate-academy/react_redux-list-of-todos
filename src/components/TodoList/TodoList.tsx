import React from 'react';
import { Table } from './ui/Table';

export const TodoList: React.FC = () => {
  return (
    <>
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>

      <Table />
    </>
  );
};
