import React from 'react';
import { Todo } from '../../types/Todo';
import { Todofile } from '../Todofile/Todofile';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedTodo } from '../../features/todos';

interface Props {
  array: Todo[];
}

export const TodoList: React.FC<Props> = ({ array = [] }) => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.todos.selectedTodo);

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
            onSelect={t => dispatch(setSelectedTodo(t))}
            isSelected={selectedTodo?.id === todo.id}
          />
        ))}
      </tbody>
    </table>
  );
};
