import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import './TodoList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, deleteTodo } from '../../api/todos';
import { getTodosSelector, getVisibleTodos } from '../../store/selectors';
import { setTodosAction } from '../../store/actions';

import { AddTodoForm } from '../AddTodoForm';

type Props = {
  selectedUserId: (userId: number) => void,
  currentUserId: number,
};

enum SelectByType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoList: React.FC<Props> = ({
  selectedUserId,
  currentUserId,
}) => {
  const [query, setQuery] = useState('');
  const [selectBy, setSelectBy] = useState<SelectByType>(SelectByType.All);

  const dispatch = useDispatch();
  const todos = useSelector(getTodosSelector);
  const visibleTodos = useSelector(getVisibleTodos(query));

  useEffect(() => {
    getTodos()
      .then(todosFromServer => dispatch(setTodosAction(todosFromServer)));
  }, []);

  const selectTodos = visibleTodos.filter(todo => {
    switch (selectBy) {
      case SelectByType.Active:
        return !todo.completed;

      case SelectByType.Completed:
        return todo.completed;

      case SelectByType.All:
      default:
        return todo;
    }
  });

  const deleteTodoClick = async (todoId: number | undefined) => {
    await deleteTodo(todoId);

    const updateTodo = await getTodos();

    dispatch(setTodosAction(updateTodo));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <AddTodoForm />

      <input
        type="text"
        className="TodoList__input"
        data-cy="filterByTitle"
        placeholder="Search todo"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />

      <select
        value={selectBy}
        className="TodoList__select"
        onChange={(event) => {
          setSelectBy(event.target.value as SelectByType);
        }}
      >
        <option value="all" disabled>Choose select</option>
        <option value="all">All Todos</option>
        <option value="active">Active Todos</option>
        <option value="completed">Completed Todos</option>
      </select>

      <button
        type="button"
        className="
        TodoList__user-button
        button
        TodoList__user-button--selected
        TodoList__user-button--random
        "
        onClick={() => {
          const random = [...todos].sort(() => Math.random() - 0.5);

          dispatch(setTodosAction(random));
        }}
      >
        Randomize
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list" data-cy="listOfTodos">
          {selectTodos.map(todo => (
            <li
              className={classnames('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <div>
                <button
                  className={classnames('TodoList__user-button', 'button', {
                    // eslint-disable-next-line max-len
                    'TodoList__user-button--selected': todo.userId === currentUserId,
                  })}
                  type="button"
                  data-cy="userButton"
                  onClick={() => {
                    selectedUserId(todo.userId);
                  }}
                >
                  {`User #${todo.userId}`}
                </button>

                <button
                  className="TodoList__delete-button button"
                  type="button"
                  onClick={() => {
                    deleteTodoClick(todo.id);
                  }}
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
