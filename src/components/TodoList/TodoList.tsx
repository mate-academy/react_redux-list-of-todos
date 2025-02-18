import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../api';
import { setTodos } from '../../features/todos';
import { RootState } from '../../app/store';
import { TodoListElement } from '../Todo/Todo';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();

        dispatch(setTodos(todos));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  // Получаем `todos`, `query` и `status` за один вызов useSelector
  const { todos, query, status } = useSelector((state: RootState) => ({
    todos: state.todos,
    query: state.filter.query,
    status: state.filter.status,
  }));

  // Фильтрация вынесена в отдельную функцию
  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  // Упрощённый return
  if (isLoading) {
    return <Loader />;
  }

  if (filteredTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

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
        {filteredTodos.map(todo => (
          <TodoListElement key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
