import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import classname from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { deleteUser, getTodos } from '../../api/api';
import { setTodosAction } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';

type Props = {
  userId: (todo: Todo) => void,
};

export const TodoList: React.FC<Props> = ({ userId }) => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const [optionValue, setOptionValue] = useState('');
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [render, setRender] = useState(false);

  const lowerInputValue = inputValue.toLowerCase();

  const todos = useSelector(getTodosSelector);

  const filterTodo = todos
    .filter(todo => todo.title.toLocaleLowerCase()
      .includes(lowerInputValue));

  useEffect(() => {
    try {
      const loadTodosFromServer = async () => {
        const todosFromServer = await getTodos();

        dispatch(setTodosAction(todosFromServer));
      };

      loadTodosFromServer();
    } catch (error) {
      setHasLoadingError(true);
    }

    setRender(false);
  }, [render]);

  const deleteTodoFromServer = async (id: number) => {
    await deleteUser(id);
    setRender(true);
  };

  const filterSelect = (currentTodo: Todo[]) => {
    switch (optionValue) {
      case 'active': {
        return currentTodo.filter(todo => todo.completed === false);
      }

      case 'completed': {
        return currentTodo.filter(todo => todo.completed === true);
      }

      default: {
        return currentTodo;
      }
    }
  };

  const finishTodo = filterSelect(filterTodo);

  return (
    <div className="TodoList">
      {hasLoadingError
        ? <p>Oops ... Something went wrong...</p>
        : (
          <>
            <h2>Todos:</h2>

            <div className="TodoList__list-container">

              <input
                className="input is-rounded"
                value={inputValue}
                placeholder="Enter a title"
                onChange={(event) => {
                  setInputValue(event.currentTarget.value);
                }}
              />

              <div className="select is-rounded is-small">
                <select
                  value={optionValue}
                  onChange={(event) => {
                    setOptionValue(event.currentTarget.value);
                  }}
                >

                  <option
                    value="all"
                  >
                    All
                  </option>

                  <option
                    value="active"
                  >
                    Active
                  </option>

                  <option
                    value="completed"
                  >
                    Completed
                  </option>

                </select>

              </div>

              <ul className="TodoList__list">
                {finishTodo.map(todo => {
                  return (
                    <li
                      key={todo.id}
                      className={classname('TodoList__item', {
                        'TodoList__item--checked': todo.completed,
                        'TodoList__item--unchecked': !todo.completed,
                      })}
                    >
                      <label>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          readOnly
                        />
                        <p>{todo.title}</p>
                      </label>

                      <div>
                        <button
                          className="
                            TodoList__user-button
                            button
                            button--selected
                          "
                          type="button"
                          onClick={() => deleteTodoFromServer(todo.id)}
                        >
                          DELETE
                        </button>

                        <button
                          className="
                            TodoList__user-button
                            TodoList__user-button--selected
                            button
                          "
                          type="button"
                          onClick={() => userId(todo)}
                        >
                          {`User #${todo.userId}`}
                        </button>
                      </div>

                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
    </div>
  );
};
