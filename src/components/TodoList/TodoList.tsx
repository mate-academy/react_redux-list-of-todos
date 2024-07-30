/* eslint-disable */
import React from 'react';
import {  useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { filterTodos } from '../../app/filterHelper';
import { Status } from '../../types/Status';
import { TodoPart } from './TodoPart';

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state: RootState) => state.todos);
  const { status, query } = useAppSelector((state: RootState) => state.filter);
  const filteredTodos = filterTodos(todos, status as Status, query);


  return (
    <>
      {!filteredTodos.length && (
        <tr>
          <td>
            <p className="notification is-warning">
              There are no todos matching current filter criteria
            </p>
          </td>
        </tr>
      )}

      {filteredTodos.length > 0 && (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>
              <th>Title</th>
              <th> </th>
            </tr>
          </thead>
          <TodoPart />
        </table>
      )}
    </>
  );
};
