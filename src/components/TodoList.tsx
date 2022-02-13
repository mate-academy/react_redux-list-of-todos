import { useEffect, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const {
    todos,
    loading,
    error,
  }: State = useTypedSelector(state => state);
  const { fetchTodos, setUserIdAction } = useActions();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const filterTodos = (todosToFilter: Todo[]) => {
    const filteredTodos = todosToFilter.filter(todo => todo.title.includes(query));

    switch (status) {
      case 'true':
        return filteredTodos.filter(todo => todo.completed === true);
      case 'false':
        return filteredTodos.filter(todo => todo.completed === false);
      case 'all':
      default:
        return filteredTodos;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="input is-small"
      />

      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
        className="select"
      >
        <option value="all">all</option>
        <option value="false">active</option>
        <option value="true">completed</option>
      </select>

      <ul className="TodoList">
        {filterTodos(todos).map(todo => (
          <li key={todo.id}>
            {`${todo.title} ${todo.completed}`}
            <button
              type="button"
              className="button is-rounded is-info"
              style={{ marginLeft: '100px' }}
              onClick={() => setUserIdAction(todo.userId)}
            >
              {` User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
