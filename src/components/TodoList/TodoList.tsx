import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoFC } from '../TodoFC';

interface Props {
  todos: Todo[];
  setPickedTodo: (pickedTodo: Todo) => void;
  selectedTodo: Todo;
}

export const TodoList: React.FC<Props> = ({
  todos, setPickedTodo, selectedTodo,
}) => (
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
      {todos.map(todo => {
        return (
          <TodoFC
            key={todo.id}
            todo={todo}
            setPickedTodo={setPickedTodo}
            selectedTodo={selectedTodo}
          />
        );
      })}
    </tbody>
  </table>
);
