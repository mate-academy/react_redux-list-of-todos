/* eslint-disable */
import { currentTodoActions } from '../../features/currentTodo';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  loading: boolean;
  selectItemId: number;
}

export const TodoList: React.FC<Props> = ({ todos, loading, selectItemId }) => {
  const dispatch = useAppDispatch();

  const onSelectButton = (todo: Todo) =>
    dispatch(currentTodoActions.select(todo));

  return (
    <>
      {!loading && todos.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
                itemSelect={selectItemId === todo.id}
                onSelectButton={todo => onSelectButton(todo)}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
