import React from 'react';
import { Todo } from '../../types/Todo';
import { ListButton } from '../ListButton';

type Props = {
  todos: Todo[] | [];
};

export const TodoTable: React.FC<Props> = React.memo(({ todos }) => {
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
        {todos?.map((todo) => (
          <tr data-cy="todo" key={todo.id}>
            {todo.completed ? (
              <>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
                <td className="is-vcentered is-expanded">
                  <p className="has-text-success">{todo.title}</p>
                </td>
                <ListButton todo={todo} />
              </>
            ) : (
              <>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered"> </td>
                <td className="is-vcentered is-expanded">
                  <p className="has-text-danger">{todo.title}</p>
                </td>
                <ListButton todo={todo} />
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
