import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import cn from 'classnames';

import { ReactComponent as DeleteIcon } from '../../assets/img/delete.svg';

import './TodoList.scss';

interface Props {
  todos: Todo[],
  handleShuffleTodos: any,
  handleShowTodos: any,
  handleFilterQuery: any,
  handleClick: any,
  handleChange: any,
}

export const TodoList: React.FC<Props> = ({
  todos,
  handleShuffleTodos,
  handleShowTodos,
  handleFilterQuery,
  handleClick,
  handleChange,
}) => {
  const dispatch = useDispatch();
  const {
    typeOfTodos,
    filterQuery,
    activeTodoId,
  } = useSelector((state: RootState) => state);

  const handleDeleteTodo = async (id: number) => {
    const { deleteTodo } = await import('../../store');

    dispatch(deleteTodo(id));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">

        <input
          type="text"
          className="TodoList__item inputFilter"
          placeholder="Filter the todos by title"
          value={filterQuery}
          onChange={handleFilterQuery}
        />

        <select
          className="TodoList__item select"
          value={typeOfTodos}
          onChange={handleShowTodos}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <button
          className="button"
          type="button"
          onClick={handleShuffleTodos}
        >
          Randomize
        </button>

        <ul className="TodoList__list">
          {todos.map(({
            id,
            userId,
            title,
            completed,
          }) => (
            <li
              key={id}
              className={cn(
                'TodoList__item',
                { 'TodoList__item--unchecked': !completed },
                { 'TodoList__item--checked': completed },
              )}
            >
              <label htmlFor={id.toString()}>
                <input
                  id={id.toString()}
                  type="checkbox"
                  checked={completed}
                  readOnly
                  onChange={event => handleChange(event, id)}
                />
                <p>
                  {title}
                </p>
              </label>

              <div>
                <button
                  className={cn(
                    { 'TodoList__user-button': activeTodoId !== id },
                    { 'TodoList__user-button--selected': activeTodoId === id },
                    'button',
                  )}
                  type="button"
                  onClick={(event => handleClick(event, userId, id))}
                >
                  User&nbsp;#
                  {userId}
                </button>
                <DeleteIcon
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDeleteTodo(id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
