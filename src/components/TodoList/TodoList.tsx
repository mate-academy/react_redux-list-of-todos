/* eslint-disable */
import React from 'react';
import { v4 as getId } from 'uuid'
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { getFilteredTodos } from '../../utils/getFilteredTodos';
import { Todo } from '../Todo/Todo';
import { Todo as TodoType } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const filter = {
    query,
    status,
  };

  const filteredTodos = getFilteredTodos(filter, todos);

  const { id } = currentTodo || {} as TodoType;

  const setCurrentTodo = (todo: TodoType) => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <>
      {!filteredTodos.length
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        ) : (
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
              {filteredTodos.map(todo => (
                <Todo
                  key={getId()}
                  todo={todo}
                  currentTodoId={id}
                  setCurrentTodo={setCurrentTodo}
                />
              ))}
            </tbody>
          </table>
        )
      }
    </>
  );
};
