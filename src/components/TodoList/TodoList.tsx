import { useMemo } from 'react';
import { TodoItem } from '../TodoItem';
import { useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { NoMessegeTodo } from '../NoMessageTodo/NoMessageTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.todos);
  const status = useAppSelector((state) => state.filter.status);
  const query = useAppSelector((state) => state.filter.query);

  const visibleTodos = useMemo(() => {
    const filteredTodos = todos
      .filter((todo) => {
        switch (status) {
          case Status.ACTIVE:
            return !todo.completed;

          case Status.COMPLETED:
            return todo.completed;

          case Status.ALL:
          default:
            return todo;
        }
      })
      .filter(({ title }) => (
        title.toLowerCase().includes(query.toLowerCase())
      ));

    return filteredTodos;
  }, [todos, status, query]);

  return (
    <>
      {(!visibleTodos.length && query) && <NoMessegeTodo />}

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
          {visibleTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </tbody>
      </table>
    </>
  );
};
