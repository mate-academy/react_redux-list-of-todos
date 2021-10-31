import React, { useState, useEffect, useCallback } from 'react';

import classNames from 'classnames';
import { debounce } from 'lodash';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { RootState, getVisibleTodos, getSelectedUserId } from '../../store';
import { changeUser, clearUser } from '../../store/selectedUser';
import './TodoList.scss';
import {
  loadTodos,
  todosTypeActions,
  actionCreator,
} from '../../store/todos';

const mapState = (state: RootState) => {
  return {
    todos: getVisibleTodos(state),
    selectedUserId: getSelectedUserId(state),
  };
};

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const TodoList: React.FC<Props> = ({
  selectedUserId,
  todos,
}) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const filter = useCallback(
    debounce((searchQuery: string) => dispatch(actionCreator.filterTodos(searchQuery)), 1000),
    [],
  );

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  const selectUserId = (id: number) => {
    if (id !== selectedUserId) {
      dispatch(changeUser(id));
    } else {
      dispatch(clearUser());
    }
  };

  const filterTodos = (actionType: string) => {
    switch (actionType) {
      case todosTypeActions.SHOW_ALL:
        dispatch(actionCreator.showAllTodos(query));
        break;
      case todosTypeActions.SHOW_ACTIVE:
        dispatch(actionCreator.showActiveTodos(query));
        break;
      case todosTypeActions.SHOW_COMPLETED:
        dispatch(actionCreator.showCompletedTodos(query));
        break;
      default:
        break;
    }
  };

  return (
    <div className="TodoList">
      <div className="TodoList__control">
        <input
          className="TodoList__input"
          type="text"
          placeholder="Search"
          value={query}
          onChange={event => {
            setQuery(event.target.value);
            filter(event.target.value);
          }}
        />
        <select
          className="TodoList__select"
          onChange={event => filterTodos(event.target.value)}
        >
          <option value={todosTypeActions.SHOW_ALL}>
            All
          </option>
          <option value={todosTypeActions.SHOW_ACTIVE}>
            Active
          </option>
          <option value={todosTypeActions.SHOW_COMPLETED}>
            Completed
          </option>
        </select>
      </div>
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !todo.completed,
                  'TodoList__item--checked': todo.completed,
                },
              )}
            >
              <label htmlFor="input">
                <input
                  name="input"
                  type="checkbox"
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <div className="buttons-block">
                <button
                  type="button"
                  className={classNames({
                    button: true,
                    'TodoList__user-button': true,
                  })}
                  onClick={() => dispatch(actionCreator.deleteTodo(todo.id))}
                >
                  Delete todo
                </button>

                <button
                  className={classNames({
                    button: true,
                    'TodoList__user-button': true,
                    'TodoList__user-button--selected': selectedUserId === todo.userId,
                  })}
                  type="button"
                  onClick={() => selectUserId(todo.userId)}
                >
                  {`User#${todo.userId.toString()}`}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default connector(TodoList);
