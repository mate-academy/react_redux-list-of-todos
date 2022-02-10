/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getSelectedUserId, getTodoSelector } from '../../store/selectors';
import { loadTodosAction, selectUserId } from '../../store/actions';
import { deleteTodoFromServer, getAllTodos } from '../../api/api';
import { SearchTodo } from '../SearchTodo';
import './TodoList.scss';
import { Todo } from '../../react-app-env';

enum TodoStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodoSelector);
  const selectedUserId = useSelector(getSelectedUserId);
  const [todoStatus, setTodoStatus] = useState(TodoStatus.ALL);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  const loadTodosFromServer = async () => {
    const todoFromServer = await getAllTodos();

    // eslint-disable-next-line no-console
    console.log('render');

    dispatch(loadTodosAction(todoFromServer));
    setFilteredTodos(todoFromServer);
  };

  useEffect(() => {
    loadTodosFromServer();
  }, []);

  const filteredTodo = (status: boolean) => {
    const result = todos.filter(todo => todo.completed === status);

    return result;
  };

  const loadData = () => {
    let newTodos;

    switch (todoStatus) {
      case TodoStatus.ACTIVE:
        newTodos = filteredTodo(true);
        break;

      case TodoStatus.COMPLETED:
        newTodos = filteredTodo(false);
        break;

      default:
        newTodos = [...todos];
        break;
    }

    setFilteredTodos(newTodos);
  };

  useEffect(() => {
    loadData();
  }, [todoStatus]);

  const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== todoStatus) {
      setTodoStatus(event.target.value as TodoStatus);
    }
  };

  const handleCLick = async (userId: number) => {
    if (selectedUserId !== userId) {
      dispatch(selectUserId(userId));
    }
  };

  const handleChange = (input: string) => {
    setQuery(input);
  };

  const handleDeleteTodo = async (todoId: number) => {
    // eslint-disable-next-line no-console
    console.log('delete');
    await deleteTodoFromServer(todoId);
    loadTodosFromServer();
  };

  return (
    <div className="TodoList">
      <SearchTodo
        handleSelect={handleSelect}
        todoStatus={todoStatus}
        handleChange={handleChange}
        query={query}

      />
      <button
        type="button"
        className="button TodoList__user-button--selected"
      >
        Randomizer
      </button>
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => {
            if (todo.title.toLocaleLowerCase().includes(query)) {
              return (
                (
                  <li
                    key={todo.id}
                    className={classNames(
                      'TodoList__item ',
                      {
                        'TodoList__item--unchecked': !todo.completed,
                        'TodoList__item--checked': todo.completed,
                      },
                    )}
                  >
                    <label htmlFor={`${todo.id}`}>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        id={`${todo.id}`}
                        readOnly
                      />
                      <p>
                        {todo.title}
                      </p>
                    </label>
                    <div>
                      <button
                        className={classNames(
                          'button',
                          'TodoList__user-button',
                          {
                            'TodoList__user-button--selected': todo.userId === selectedUserId
                          || selectedUserId === 0,
                          },
                        )}
                        type="button"
                        onClick={() => handleDeleteTodo(todo.id)}
                      >
                        DELETE
                      </button>
                      <button
                        className={classNames(
                          'button',
                          'TodoList__user-button',
                          {
                            'TodoList__user-button--selected': todo.userId === selectedUserId
                          || selectedUserId === 0,
                          },
                        )}
                        type="button"
                        onClick={() => handleCLick(todo.userId)}
                      >
                        {`User #${todo.userId}`}
                      </button>
                    </div>
                  </li>
                )
              );
            }

            return null;
          })}
        </ul>
      </div>
    </div>
  );
};
