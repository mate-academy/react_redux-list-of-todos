/* eslint-disable */
import { Todo, Todo as TodoType } from '../../types/Todo';

import { TodoCard } from '../TodoCard/TodoCard';

type Props = {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({todos}) => {
  return (
    <>
      {!todos.length 
        ? 
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        : 
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
              {todos !== null &&
                todos.map((todo: TodoType) => 
                  <TodoCard todo={todo} key={todo.id} />
                )}
            </tbody>
          </table>
        } 
    </>
  );
};
