import React from 'react';
import './TodoList.scss';
import { connect } from 'react-redux';
import { Todo } from '../../interfaces';
import { RootState, getTodos, sortTodos } from '../../store';

type Props = {
  todos: Todo[];
  sortBy: (sortType: string) => void;
};

const TodoList: React.FC<Props> = ({ todos, sortBy }) => (
  <>
    <div className="buttons">
      <button type="button" className="todos__button btn btn-secondary" onClick={() => sortBy('completed')}>Completed</button>
      <button type="button" className="todos__button btn btn-secondary" onClick={() => sortBy('title')}>A-Z</button>
      <button type="button" className="todos__button btn btn-secondary" onClick={() => sortBy('user')}>User</button>
    </div>
    <hr />
    <ul className="todos__list">
      {todos.map((todo: Todo) => (
        <li className="todos__item" key={todo.id}>
          <div className="todos__status">
            {
              todo.completed
                ? <input type="checkbox" checked />
                : <input type="checkbox" disabled />
            }
          </div>
          <p className="todos__title">{todo.title}</p>
          <div className="todos__user">{todo.user?.name}</div>
        </li>
      ))}
    </ul>
  </>
);

const mapState = (state: RootState) => ({
  todos: getTodos(state),
});

const mapDispatch = {
  sortBy: sortTodos,
};

export default connect(mapState, mapDispatch)(TodoList);
