import React from 'react';
import './TodoList.scss';
import { connect } from 'react-redux';
import { Todo } from '../../interfaces';
import {
  RootState, getTodos, sortTodos, removeTodo,
} from '../../store';

type Props = {
  todos: Todo[];
  sortBy: (sortType: string) => void;
  todoRemover: (todoId: number) => void;
};

const TodoList: React.FC<Props> = ({ todos, sortBy, todoRemover }) => (
  <>
    <p className="todos__sort">Sort by:</p>
    <div className="buttons">
      <button
        type="button"
        className="todos__button btn btn-primary"
        onClick={() => sortBy('completed')}
      >
        Completed
      </button>
      <button
        type="button"
        className="todos__button btn btn-primary"
        onClick={() => sortBy('title')}
      >
        A-Z
      </button>
      <button
        type="button"
        className="todos__button btn btn-primary"
        onClick={() => sortBy('user')}
      >
        User
      </button>
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
          <button className="todos__remove" type="button" onClick={() => todoRemover(todo.id)}>&times;</button>
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
  todoRemover: removeTodo,
};

export default connect(mapState, mapDispatch)(TodoList);
