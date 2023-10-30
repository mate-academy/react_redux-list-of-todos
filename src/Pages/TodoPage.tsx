import { useAppSelector } from '../app/hooks';
import { TodoFilter } from '../components/TodoFilter';
import { TodoList } from '../components/TodoList';

export const TodoPage = () => {
  const todos = useAppSelector((state) => state.todos);

  return (
    <>
      <h1 className="title">Todos:</h1>

      <div className="block">
        <TodoFilter />
      </div>

      <div className="block">
        {!!todos.visibleTodos.length && (
          <TodoList visibleTodos={todos.visibleTodos} />
        )}
      </div>
    </>
  );
};
