import { useEffect } from 'react';
import classNames from 'classnames';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import './TodosList.scss';
import { Loader } from '../Loader';
import { useActions } from '../../hooks/useActions';
import { deleteTodoFromServer } from '../../api/todos';

export const TodosList: React.FC = () => {
  const {
    error,
    loading,
    todos,
    searchQuery,
    todoStatus,
  } = useTypedSelector(state => state.todos);
  const { fetchTodos, setSelectedUserId } = useActions();

  useEffect(() => {
    fetchTodos(todoStatus);
  }, [todoStatus]);

  const deleteTodo = async (todoId: number) => {
    await deleteTodoFromServer(todoId);

    await fetchTodos(todoStatus);
  };

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <div className="notification is-danger">
        {error}
      </div>
    );
  }

  const visibleTodos = todos.filter(
    todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="todo-list">
      {visibleTodos.map(todo => (
        <article
          key={todo.id}
          className={classNames('message',
            {
              'is-success': todo.completed,
              'is-danger': !todo.completed,
            })}
        >
          <div className="todo-list__buttons">
            <button
              type="button"
              className="button is-info is-rounded"
              onClick={() => {
                setSelectedUserId(todo.userId);
              }}
            >
              Select User #
              {todo.userId}
            </button>
            <button
              type="button"
              className="button is-link is-rounded"
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              Delete Todo
            </button>
          </div>
          <div className="message-body">
            {todo.title}
          </div>
        </article>
      ))}
    </div>
  );
};
