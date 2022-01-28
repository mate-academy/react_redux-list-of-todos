import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import classNames from 'classnames';
import {
  getTodos,
  getUser,
  deleteTodo,
  handleChecked,
} from '../../store/index';
import { fetchUser } from '../../asyncActions/todos';

const TodoContainer = styled.div`
flex-basis: 60%;
margin:10px;
background-color: white;
padding: 10px;
border-radius: 10px;
`;

const TodoRow = styled.div`
display: flex;
gap:20px;
padding:10px;
margin-bottom:10px;
justify-content: space-between;
align-items: center;
`;

const TodoList = () => {
  const todos = useSelector(getTodos);
  const currentUser = useSelector(getUser);
  const dispatch = useDispatch();
  const [status, setStatus] = useState('All');
  const [query, setQuery] = useState('');

  const todosToDisplay = () => {
    const filterByStatus = (todo: Todo) => {
      switch (status) {
        case 'completed':
          return todo.completed;
        case 'notCompleted':
          return !todo.completed;
        default:
          return true;
      }
    };

    return todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
      && filterByStatus(todo)));
  };

  const displayedTodoList = todosToDisplay();

  return (
    <TodoContainer>
      <input
        className="input is-normal mb-2"
        type="text"
        placeholder="Search for todo"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="select mb-2">
        <select
          name="status"
          // defaultValue={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Still in process</option>
        </select>

      </div>
      {todos.length > 0 && displayedTodoList.map((todo: Todo) => (
        <TodoRow key={todo.id}>
          <button
            type="button"
            className={classNames('button', 'is-dark', 'is-outlined',
              { 'is-focused': currentUser && todo.userId === currentUser.id })}
            onClick={() => dispatch(fetchUser(todo.userId))}
          >
            {`User: ${todo.userId}`}
          </button>
          <label htmlFor="status">
            <input
              defaultChecked={todo.completed}
              onChange={() => dispatch(handleChecked(todo.id))}
              type="checkbox"
              id="status"
            />
          </label>
          <p style={{ flexBasis: '70%' }}>{todo.title}</p>
          <button
            type="button"
            className="delete"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            delete
          </button>
        </TodoRow>
      ))}
    </TodoContainer>
  );
};

export default TodoList;
