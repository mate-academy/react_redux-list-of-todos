import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoComponent } from '../TodoComponent/TodoComponent';

interface Props {
  todos: Todo[];
  setIsLoading: (value: boolean) => void;
}

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  setIsLoading,
}) => {
  return (
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
        {todos.map((todo) => {
          return (
            <TodoComponent
              todo={todo}
              key={todo.id}
              setIsLoading={setIsLoading}
            />
          );
        })}
      </tbody>
    </table>
  );
});
