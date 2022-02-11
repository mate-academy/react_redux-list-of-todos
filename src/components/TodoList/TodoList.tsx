import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { getTodos, getUser } from '../../api/api';
import {
  loadTodosAction, saveInputAction,
  selectOptionAction, loadUserAction, deleteTodoAction,
} from '../../store/actions';
import {
  getInputSelector, getOptionSelector, getTodosSelector,
} from '../../store/selectors';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodosSelector);
  const input = useSelector(getInputSelector);
  const option = useSelector(getOptionSelector);

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(loadTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => (
    dispatch(saveInputAction(event))
  );

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => (
    dispatch(selectOptionAction(event))
  );

  const userClickHandler = async (userId: number) => {
    const userFromServer = await getUser(userId);

    dispatch(loadUserAction(userFromServer));
  };

  const filterTodos = () => {
    let filteredTodos;

    switch (option) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = [...todos];
    }

    const lowerCaseInput = input.toLowerCase();

    return filteredTodos.filter(({ title }) => (
      title.includes(lowerCaseInput)
    ));
  };

  const filteredTodos = filterTodos();

  const deleteTodo = (id: number) => dispatch(deleteTodoAction(id));

  return (
    <>
      <form action="get">
        <input
          type="text"
          placeholder="Enter a title"
          value={input}
          onChange={changeHandler}
        />
        <select
          value={option}
          onChange={selectHandler}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
      </form>
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {filteredTodos.map((todo: Todo) => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
              >
                <label htmlFor="todo">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <button
                  className="button TodoList__user-button"
                  type="button"
                  onClick={() => userClickHandler(todo.userId)}
                >
                  {`User\xa0#${todo.userId}`}
                </button>

                <button
                  className="button TodoList__user-button"
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
