/* eslint-disable max-len */
import { TodoItem } from '../TodoItem/TodoItem';
import { NoTodosMessage } from '../NoTodosMessage';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks';
import { actions as currenTodoActions } from '../../features/currentTodo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();

  const set = (newTodo: Todo) => dispatch(currenTodoActions.setTodo(newTodo));

  return (
    <>
      {todos.length ? (
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
              <TodoItem
                key={todo.id}
                todo={todo}
                setCurrent={set}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <NoTodosMessage />
      )}
    </>
  );
};
