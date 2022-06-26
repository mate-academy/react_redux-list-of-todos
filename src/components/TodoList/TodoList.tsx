import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoByid, getTodos, getUser } from '../../api/api';
import { setTodosAction, setUserByIdAction } from '../../store/actions';
import { getSelectedUserById, getTodosSelector } from '../../store/selectors';

type Props = {
};

export const TodoList: React.FC<Props> = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const [visibleTodos, setVisibleTodos] = useState('all');
  const options: OptionArray = ['all', 'active', 'completed'];

  const todos = useSelector(getTodosSelector);
  const selectedUser = useSelector(getSelectedUserById);

  const requestTodos = async () => {
    try {
      const todosFromServer = await getTodos();

      dispatch(setTodosAction(todosFromServer));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    requestTodos();
  }, []);

  const handleSelectUser = async (userId: number) => {
    if (selectedUser?.id !== userId) {
      try {
        const userById = await getUser(userId);

        dispatch(setUserByIdAction(userById));
      } catch {
        // eslint-disable-next-line no-console
        console.log('User not found');
      }
    }
  };

  const handleTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const filteredQuery = todos
    .filter((todo: Todo) => todo.title.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase()));

  const filteredVisible = (allTodos: Todo[]) => {
    switch (visibleTodos) {
      case 'active': {
        return allTodos.filter(todo => todo.completed === false);
      }

      case 'completed': {
        return allTodos.filter(todo => todo.completed === true);
      }

      default: {
        return allTodos;
      }
    }
  };

  const resultGoods = filteredVisible(filteredQuery);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        value={query}
        onChange={handleTodo}
      />
      <select onChange={(event) => {
        setVisibleTodos(event.target.value);
      }}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className="TodoList__list-container">

        <ul className="TodoList__list">
          {resultGoods.map(todo => (
            <li
              className={cn('TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
              key={todo.id}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              <div>
                <button
                  className="button-delete"
                  type="button"
                  onClick={async () => {
                    await deleteTodoByid(todo.id);
                    requestTodos();
                  }}
                >
                  Delete
                </button>
                <button
                  className={cn('TodoList__user-button', 'button', {
                    // eslint-disable-next-line max-len
                    'TodoList__user-button--selected': selectedUser?.id === todo.userId,
                  })}
                  type="button"
                  onClick={() => {
                    handleSelectUser(todo.userId);
                  }}
                >
                  {`User#${todo.userId}`}
                </button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
