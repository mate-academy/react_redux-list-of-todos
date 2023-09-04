/* eslint-disable max-len */
import { FC } from 'react';
import { Todo } from '../../types/Todo';
import filteredTodos from '../callBackFunctions/IsIncludes';
import { Loader } from '../Loader';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  showTodoUser: (value: Todo) => void,
  todos: Todo[],
  value: string,
  status: string,
  isLoader: boolean,
  currentTodo: Todo | null,
};

export const TodoList: FC<Props> = ({
  showTodoUser,
  isLoader,
  value,
  status,
  todos,
  currentTodo,
}) => {
  const visibleTodos = filteredTodos(todos, value, status);

  return (
    <>
      {visibleTodos.length <= 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
      {isLoader
        ? <Loader />
        : (
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
              {visibleTodos.map(todo => (
                <tr
                  key={todo.id}
                  data-cy="todo"
                  className={todo === currentTodo ? 'has-background-info-light' : ''}
                >
                  <TodoItem
                    todo={todo}
                    currentTodo={currentTodo}
                    showTodoUser={showTodoUser}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
