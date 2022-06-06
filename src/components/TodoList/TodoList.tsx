import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './TodoList.scss';
import '../../api';
import { Options } from '../../enums';
import { deleteTodo, loadUser } from '../../redux';
import { actions as todosActions } from '../../redux/todos';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const { todos } = props;
  const [searchTitle, setSearchTitle] = useState('');
  const [selectOption, setSelectOption] = useState<Options>(Options.all);

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectOption(event.target.value as Options);
  };

  const filtredTodos = todos.filter(
    todo => todo.title.toLowerCase().includes(searchTitle.toLowerCase())
      && (
        selectOption === 'all'
        || (selectOption === 'active' && todo.completed === false)
        || (selectOption === 'completed' && todo.completed === true)
      ),
  );

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <input
          className="TodoList__list-searchBar"
          type="text"
          value={searchTitle}
          onChange={searchHandler}
        />
        <div className="TodoList__list-select-container">
          <label htmlFor="select_todo">Choose a todo:</label>

          <select className="TodoList__list-select" onChange={selectHandler}>
            <option
              value={Options.all}
              disabled
              selected
            >
              --Please choose an option--
            </option>
            <option value={Options.all}>all</option>
            <option value={Options.active}>active</option>
            <option value={Options.completed}>completed</option>
          </select>
        </div>
        <button
          className="TodoList__randomize"
          type="button"
          onClick={() => {
            dispatch(todosActions.randomize);
          }}
        >
          Randomize
        </button>
        <ul className="TodoList__list">
          {filtredTodos.length === 0
            ? 'No todos'
            : filtredTodos.map(todo => (
              <li
                className={`TodoList__item TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`}
                key={todo.id}
              >
                <label>
                  <input
                    type="checkbox"
                    onClick={e => e.preventDefault()}
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>
                <div>
                  <button
                    className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                  "
                    type="button"
                    onClick={() => {
                      dispatch(loadUser(todo.userId));
                    }}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                  &nbsp;
                  <button
                    type="button"
                    className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button
                    TodoList__delete-button
                  "
                    onClick={() => dispatch(deleteTodo(todo.id))}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
