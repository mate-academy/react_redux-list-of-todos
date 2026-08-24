import React from 'react';
import { Todo } from '../../types/Todo';
import { Todofile } from '../Todofile/Todofile';

interface Props {
  array: Todo[];
  selectedTodo: Todo | null;
  onselect: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  array = [],
  selectedTodo,
  onselect,
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
        {array.map(todo => (
          <Todofile
            key={todo.id}
            todo={todo}
            onSelect={onselect}
            isSelected={selectedTodo?.id === todo.id}
          />
        ))}
      </tbody>
    </table>
  );
};
