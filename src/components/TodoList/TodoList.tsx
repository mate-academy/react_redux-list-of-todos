import React, {
  useState, useMemo, useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos } from '../../api/api';
import {
  addTodosActionCreator, selectUserIdAction,
} from '../../store/actions';
import { getTodosSeletor } from '../../store/selectors';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('all');

  const todos = useSelector(getTodosSeletor);
  const dispatch = useDispatch();
  const selectUserId = (id: number) => dispatch(selectUserIdAction(id));

  useEffect(() => {
    getTodos().then((todosFS) => dispatch(addTodosActionCreator(todosFS)));
  }, []);

  const filteredTodos = useMemo(() => (
    todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ))
      .filter(todo => {
        switch (selectedOption) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return true;
        }
      })), [selectedOption, query, todos]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
        id="search-query"
        className="TodoList_input"
        placeholder="Write the Title"
      />
      <select
        onChange={event => setSelectedOption(event.target.value)}
        className="TodoList_section"
      >
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <li
              className={`TodoList__item ${todo.completed ? 'TodoList__item--checked' : 'TodoList__item--unchecked'}`}
              key={todo.id}
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>
              <button
                className="TodoList__user-button button"
                type="button"
                onClick={() => selectUserId(todo.userId)}
              >
                User&nbsp;
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
