import { useMemo } from 'react';
import { useGetTodosQuery } from '../../features/todos';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getFiltredTodo } from '../../utils/getFiltredTodo';
import { TodoFilter } from '../TodoFilter';
import { Loader } from '../Loader';
import { TodoList } from '../TodoList';

export const Todos = () => {
  const { data, isLoading } = useGetTodosQuery();

  const filter = useAppSelector(state => state.filter);

  const filtredTodos = useMemo(() => {
    if (!data) return [];

    return getFiltredTodo(data, filter);
  }, [data, filter]);

  const generateTodoView = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (!isLoading && filtredTodos.length) {
      return <TodoList todos={filtredTodos} />;
    }

    if (!isLoading && !filtredTodos.length) {
      return (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      );
    }

    return null;
  };

  return (
    <div className="box">
      <h1 className="title">Todos:</h1>

      <div className="block">
        <TodoFilter />
      </div>

      <div className="block">{generateTodoView()}</div>
    </div>
  );
};
