import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './TodoList.scss';
import '../../api';
import { Options } from '../../enums';
import { deleteTodo, loadUser } from '../../redux';
import { actions as todoActions } from '../../redux/todos';

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
    todo => todo.title.toLocaleLowerCase()
      .includes(searchTitle.toLocaleLowerCase())
      && (
        selectOption === 'all'
        || (selectOption === 'active' && todo.completed === false)
        || (selectOption === 'completed' && todo.completed === true)
      ),
  );

  return (
    <div className="TodoList">
      <h2>Todos</h2>
      <div className="TodoList__list-container">
        <input
          type="text"
          className="TodoList__list-searchbar"
          value={searchTitle}
          onChange={searchHandler}
        />
        <div className="TodoList__list-select-container">
          <label htmlFor="select_todo">
            Choose a todo
          </label>

          <select className="TodoList__list-selected" onChange={selectHandler}>
            <option
              value={Options.all}
              disabled
              selected
            >
              Choose an option
            </option>
            <option value={Options.all}>all</option>
            <option value={Options.active}>active</option>
            <option value={Options.completed}>completed</option>
          </select>
        </div>

        <button
          type="button"
          className="TodoList__randomize-button"
          onClick={() => {
            dispatch(todoActions.randomize());
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
