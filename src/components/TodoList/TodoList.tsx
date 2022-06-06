import React, {
  ChangeEvent,
  useEffect,
} from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useTypesSelector } from '../../store';
import { fetchTodos } from '../../api/api';
import {
  deleteTodo,
  setCompleteStatus,
  setQuery, setRandom, setSorteredTodos,
} from '../../store/actions';

type Props = {
  selectUser: (x:number) => void,
};

export const TodoList: React.FC<Props> = ({
  selectUser,
}) => {
  const {
    error,
    loading,
    todos,
    query,
    completeStatus,
    sortedTodos,
    userId,
  } = useTypesSelector(state => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(setSorteredTodos(todos));
  }, []);

  useEffect(() => {
    dispatch(setSorteredTodos(todos));
  }, [todos, completeStatus, query]);

  const filterByComplete = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCompleteStatus(event.target.value));
  };

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const randomize = () => {
    dispatch(setRandom(sortedTodos));
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <label>
        Filter by name:
        <input type="text" onChange={search} value={query} />
        <select
          value={completeStatus}
          onChange={filterByComplete}
        >
          <option value="All">
            All
          </option>
          <option value="Complete">
            Complete
          </option>
          <option value="notComplete">
            notComplete
          </option>
        </select>
      </label>

      <button type="button" onClick={randomize}>
        Random
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {sortedTodos.map((todo) => (
            <li className={
              classNames(
                'TodoList__item', {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )
            }
            >
              <label>
                <input type="checkbox" checked={todo.completed} />
                <p>{todo.title}</p>
              </label>
              <div>
                <button
                  className={
                    classNames(
                      'TodoList__user-button', 'button', {
                        'TodoList__user-button--selected':
                        todo.userId === userId,
                      },
                    )
                  }
                  type="button"
                  onClick={() => {
                    selectUser(todo.userId);
                  }}
                >
                  User&nbsp;#
                  {todo.userId ? todo.userId : 'undefined'}
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={
                    () => (dispatch(deleteTodo(todo.id)))
                  }
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
