import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoComponent } from '../TodoComponent';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = props => {
  const { todos } = props;

  return (
    <>
      {!!todos.length ? (
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
            {todos.map(todo => (
              <TodoComponent key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
