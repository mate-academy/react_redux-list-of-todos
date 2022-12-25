import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { Thead } from './Thead';
import { TodoItem } from './TodoItem';

export const TodoList: FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const { todos } = useAppSelector(state => state.todos);
  const isEmpty = useMemo(() => visibleTodos.length === 0, [visibleTodos]);
  const { status, query } = useAppSelector(state => state.filter);

  useEffect(() => {
    const filtredTodos = todos
      .filter(todo => {
        switch (status) {
          case 'active':
            return !todo.completed;

          case 'completed':
            return todo.completed;

          default:
            return true;
        }
      })
      .filter(todo => (
        todo.title
          .toLowerCase()
          .includes(query.toLowerCase())
      ));

    setVisibleTodos(filtredTodos);
  }, [todos, status, query]);

  return (
    <>
      {isEmpty && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!isEmpty && (
        <table className="table is-narrow is-fullwidth">
          <Thead />

          <tbody>
            {visibleTodos.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
