import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './TodoList.scss';
import classNames from 'classnames';
import { TodoInterface } from '../../components/interfaces';
import { Todo } from '../Todo/';
import { sortStatus, STATUS, todoStatus, getInput, filterInput, randomizeTodos } from '../../store';

interface Props {
  todos: TodoInterface[];
}

export const TodoList = ({ todos }: Props) => {
  const dispatch = useDispatch();

  const status = useSelector(todoStatus);
  const search = useSelector(getInput);

  const getFilterInput = (event: any) => {
    dispatch(filterInput(event.target.value));
  };
  
  const getSortStatus = (event: any) => {
    dispatch(sortStatus(event.target.value));
  };
  
  const getRandomizeTodos = () => {
    dispatch(randomizeTodos());
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__filter">
        <label htmlFor="search">
          Search
          <input
            type="text"
            id="search"
            value={search}
            onChange={getFilterInput}
          />
        </label>

        <label htmlFor="complite">
          Complite
          <select
            name="complite"
            id="complite"
            value={status}
            onChange={getSortStatus}
          >
            <option value={STATUS.all}>{STATUS.all}</option>
            <option value={STATUS.active}>{STATUS.active}</option>
            <option value={STATUS.complited}>{STATUS.complited}</option>
          </select>
        </label>

        <button
          className="button"
          type="submit"
          onClick={getRandomizeTodos}
        >
          Randomize
        </button>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map((todo: TodoInterface) => (
            <li
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                },
              )}
              key={todo.id}
            >
              <Todo todo={todo} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
