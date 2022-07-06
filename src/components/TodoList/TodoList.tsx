/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTodosAction,
  getTodosSelector,
  setUserAction,
  setSelectedTodoId,
  getSelectedTodoId,
} from '../../store';
import { TodosValue } from '../types/type';

import './TodoList.scss';
import { getTodos, getUserById } from '../api/api';

export const TodoList: React.FC = () => {
  const [inputedValue, setInputedValue] = useState('');
  const [
    selectedTodosValue, setSelectedTodosValue,
  ] = useState<TodosValue | string>(TodosValue.all);

  const [random, setRandom] = useState(false);
  const [todoForRemoving, setTodoForRemoving] = useState([0]);

  function shuffleArray(array: any) {
    let curId = array.length;

    while (curId !== 0) {
      const randId = Math.floor(Math.random() * curId);

      curId -= 1;
      const tmp = array[curId];

      array[curId] = array[randId];
      array[randId] = tmp;
    }

    return array;
  }

  const selectTodos = (value: TodosValue | string) => {
    setSelectedTodosValue(value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(setTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const selectedTodoId = useSelector(getSelectedTodoId);

  const todosFromServer = useSelector(getTodosSelector);

  const selectedTodos = todosFromServer.filter((todo) => {
    switch (selectedTodosValue) {
      case TodosValue.completed:
        return todo.completed === true;
      case TodosValue.active:
        return todo.completed === false;
      default:
        return !todoForRemoving.includes(todo.id);
    }
  });

  let filteredTodos = [];

  filteredTodos = selectedTodos.filter((todo) => {
    return todo.title.toLowerCase().includes(
      inputedValue.toLowerCase(),
    );
  });

  useEffect(() => {
    dispatch(setTodosAction(shuffleArray(todosFromServer)));
  }, [random]);

  const selectUser = async (id: number) => {
    try {
      const userFromServer = await getUserById(id);

      dispatch(setUserAction(userFromServer));
    } catch (error) {
      dispatch(setUserAction(
        {
          id: 0, name: '', phone: '', email: '',
        },
      ));
    }
  };

  return (
    <>
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(setTodosAction(shuffleArray(todosFromServer)));
          setRandom(!random);
        }}
      >
        <input
          placeholder="input the title"
          data-cy="filterByTitle"
          className="form__input"
          value={inputedValue}
          onChange={(event) => {
            setInputedValue(event.target.value);
          }}
        />

        <select
          className="select"
          value={selectedTodosValue}
          onChange={(event) => {
            selectTodos(event.target.value);
          }}
        >
          <option
            value={TodosValue.all}
          >
            All
          </option>

          <option
            value={TodosValue.active}
          >
            Active
          </option>

          <option
            value={TodosValue.completed}
          >
            Completed
          </option>
        </select>

        <button
          type="submit"
          className="btn"
        >
          Random sort
        </button>
      </form>
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul
            className="TodoList__list"
            data-cy="listOfTodos"
          >
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={classNames({ TodoList__item: true },
                  { 'TodoList__item--unchecked': todo.completed === false },
                  { 'TodoList__item--checked': todo.completed === true })}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>

                <div className="TodoList__user-btn-block">
                  {selectedTodoId === todo.userId ? (
                    <button
                      className="
                        TodoList__user-button
                        TodoList__user-button--selected
                        button
                      "
                      type="button"
                      data-cy="userButton"
                      onClick={() => {
                        selectUser(todo.userId);
                        dispatch(setSelectedTodoId(todo.userId));
                      }}
                    >
                      {`User # ${todo.userId}`}
                    </button>
                  ) : (
                    <button
                      className="
                        TodoList__user-button
                        button
                      "
                      type="button"
                      data-cy="userButton"
                      onClick={() => {
                        selectUser(todo.userId);
                        dispatch(setSelectedTodoId(todo.userId));
                      }}
                    >
                      {`User # ${todo.userId}`}
                    </button>
                  )}
                  <button
                    type="button"
                    className="
                      button
                      TodoList__user-button
                      TodoList__user-button--remove
                    "
                    onClick={() => {
                      setTodoForRemoving([...todoForRemoving, todo.id]);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
