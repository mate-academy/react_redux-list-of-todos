import React, { FC } from 'react';
import { PreparedTodo } from '../../types';
import { Todo } from '../Todo/Todo';

interface Props {
  todosList: PreparedTodo[]
}

export const TodoList: FC<Props> = ({ todosList }) => (
  <>
    {todosList.map(todo => <Todo key={todo.id} todo={todo} />)}
  </>
);
