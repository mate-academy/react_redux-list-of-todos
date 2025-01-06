/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {actions as currentTodoActions} from '../../features/currentTodo'
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos)
  const currentTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.query.query);
  const filterByStatus = useAppSelector(state => state.query.status);
  const dispatch = useAppDispatch();

  const selectTodo = (todo: Todo) => {
    if (currentTodo === todo) {
      dispatch(currentTodoActions.clearCurrentTodo())
    } else {
      dispatch(currentTodoActions.setCurrentTodo(todo));
    }
  };
  const filteredTodos = todos.filter((todo) => {
    const existInList = todo.title.toLowerCase().includes(query.trim().toLowerCase());

      if (!existInList) {
        return false;
      }

      switch (filterByStatus) {
              case 'active':
                return !todo.completed;
              case 'completed':
                return todo.completed;
              default:
                return true;
          }
  });

  return (
    <>
      {filteredTodos.length < 1 && <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>}

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

        <tbody>
          {filteredTodos.map((todo) =>  (<TodoItem todo={todo} selectTodo={selectTodo}/>))}
        </tbody>
      </table>
    </>
  );
};
