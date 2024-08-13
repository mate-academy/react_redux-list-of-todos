/* eslint-disable */
import React from 'react';
import { TodoItem } from './TodoItem';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Todo } from '../../types/Todo';
import { State } from '../../types/State';
import { Status } from '../../enums/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector<Todo[]>(state => state.todos);
  const status = useAppSelector(status => status.filter);

  const filteredTodos = (filtBy: State, todosList: Todo[]) => {
    const isQuery = (titleTodo: string, query: string) => {
      return titleTodo.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    };

    switch (filtBy.status) {
      case Status.active:
        return todosList.filter(
          todo => !todo.completed && isQuery(todo.title, filtBy.query),
        );
      case Status.completed:
        return todosList.filter(
          todo => todo.completed && isQuery(todo.title, filtBy.query),
        );
      default:
        return todosList.filter(todo => isQuery(todo.title, filtBy.query));
    }
  };

  const filteredList = filteredTodos(status, todos);
  return (
    <>
      {filteredList.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {filteredList.map(todo => (
            <TodoItem {...todo} key={todo.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};
