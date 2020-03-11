import React, { FC } from 'react';
import { connect } from 'react-redux';

import { Todo } from './Todo';
import { TodoWithUser } from '../utils/types';
import {
  getTodos, Storage, setSort, deleteTodo,
} from '../store';

interface Props {
  todos: TodoWithUser[];
  handlerSort: (value: string) => void;
  handlerDelete: (value: number) => void;
}

const TodoListInner: FC<Props> = (props) => {
  const {
    todos,
    handlerSort,
    handlerDelete,
  } = props;

  return (
    <table className="todo__table">
      <thead>
        <tr>
          <th className="table__title">
            <button
              type="button"
              onClick={() => handlerSort('ID')}
              className="table__button"
            >
              number task
            </button>
          </th>
          <th className="table__title">
            <button
              type="button"
              onClick={() => handlerSort('title')}
              className="table__button"
            >
              Title
            </button>
          </th>
          <th className="table__title">
            <button
              type="button"
              onClick={() => handlerSort('name')}
              className="table__button"
            >
              Name
            </button>
          </th>
          <th className="table__title">
            <button
              type="button"
              onClick={() => handlerSort('condition')}
              className="table__button"
            >
              Condition
            </button>
          </th>
          <th className="table__title">-</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => <Todo key={todo.id} todo={todo} onDelete={handlerDelete} />)}
      </tbody>
    </table>
  );
};

const getMethods = { handlerSort: setSort, handlerDelete: deleteTodo };
const getData = (state: Storage) => ({
  todos: getTodos(state),
});

export const TodoList = connect(getData, getMethods)(TodoListInner);
