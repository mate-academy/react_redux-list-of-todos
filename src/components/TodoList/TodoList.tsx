import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import { Todo } from '../../types'; // User, RootState

import {
  getListOfTodos,
  // getTodosChangedStatus,
  setTodosChangedStatus,
  updateTodoStatus,
  setUserId,
  setUserError,
  getSearchQuery,
  getFilterStatus
} from '../../store';

import { filters } from '../../helpers';

// import TodoItem from './TodoItem';

import './TodoList.scss';

// import { Filters } from '../Filters';

// const filters = {
//   All: 'All',
//   Active: 'Active',
//   Completed: 'Completed',
// };

export const TodoList = () => {
  // const { todos, selectUser, changeStatus } = this.props;
  const todos: Todo[] = useSelector(getListOfTodos);
  const dispatch = useDispatch();

  const searchQuery = useSelector(getSearchQuery);
  const filterStatus = useSelector(getFilterStatus);

  const filterByQuery = (todo: Todo) => {
    if (todo.title !== null) {
      return todo.title.toLowerCase()
        .includes(searchQuery.toLowerCase());
    }

    return null;
  }

  // const changeStatus = (todoId) => {
  //   this.setState(state => ({
  //     todos: state.todos.map((todo) => {
  //       if (todo.id === todoId) {
  //         todo.completed = !todo.completed;
  //       }

  //       return todo;
  //     }),
  //   }));
  // }

  const filterByStatus = (todo: Todo) => {
    switch (filterStatus) {
      case filters.Completed:
        return todo.completed;
      case filters.Active:
        return !todo.completed;
      default:
        return true;
    }
  }

  // const randomize = () => {
  //   let num = Array(todos).length;
  //   let temp;
  //   let randomNum;
  //   let randTodos = todos;

  //   console.log(num);

  //   while (num !== 0) {
  //     randomNum = Math.floor(Math.random() * num);
  //     num -= 1;
  //     temp = randTodos[num];
  //     randTodos[num] = randTodos[randomNum];
  //     randTodos[randomNum] = temp;
  //   }

  //   dispatch(setTodos);
  // };

  // const order = (data: Todos) => {
  //   if (isRandomOrder) {
  //     console.log('isRandomOrder');
  //   } else {
  //     console.log('notRandomOrder');
  //   }
  // }

  // if (isRandomOrder) {

  // }
  // render() {
  //   const { todos, selectUser, changeStatus } = this.props;
  //   const {
  //     filterTitle,
  //     filterStatus,
  //     randomized,
  //     selectedUserId,
  //   } = this.state;

  //   let filteredTodos;
  const filteredTodos = todos
    .filter(filterByQuery)
    .filter(filterByStatus);

  // if (isRandomOrder) {
  //   console.log('isRandomOrder');
  //   randomize();
  // }
  //   filteredTodos = todos;
  //     // .filter(this.filterByTitle)
  //     // .filter(this.filterByStatus);

  return (
    <div className="TodoList">
      <h3>Todos:</h3>

      <div className="TodoList__container">
        <ul className="TodoList__list">
          {filteredTodos.map((todo: Todo) => (
            <li
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                  onClick={(e) => {
                    console.log(e.target,
                      'clicked on checkbox of todo\'s userId#'
                      + todo.userId);
                    dispatch(setTodosChangedStatus(true));
                    dispatch(updateTodoStatus(todo.id));
                  }}
                />
                <p>{todo.title}</p>
              </label>

              <button
                type="button"
                onClick={(e) => {
                  console.log(e.target, todo.userId);
                  dispatch(setUserId(todo.userId));
                  dispatch(setUserError(false));
                }}
              >
                User ID#
                {todo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
