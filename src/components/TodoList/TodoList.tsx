/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { FilterToDosBy } from '../../enums/FilterToDosBy';
import { ToDo } from '../../types/ToDo';
import './TodoList.scss';
import {
  selectors as selectorsQuery,
  setNewQuery,
} from '../../store/filterQuerySlice';
import { useAppDispatch, useAppSelector } from '../../typedHooks/hooks';

type Props = {
  selectedUserId: number,
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>,
  toDos: Array<ToDo>,
};

export const TodoList: React.FC<Props> = React.memo(({
  selectedUserId,
  setSelectedUserId,
  toDos,
}) => {
  const query = useAppSelector(selectorsQuery.query);
  const dispatch = useAppDispatch();
  // const visibleTodos = useAppSelector(toDosSelectors.visibleToDos);
  const [filterCompletedToDos, setFilterCompletedToDos]
    = useState(FilterToDosBy.all);
  const [isRandomized, setIsRandomized] = useState(false);

  const filter = useCallback(() => {
    const pattern = query.toLowerCase();

    return (toDos.filter(toDo => {
      const title = toDo.title.toLowerCase();
      const includePattern = title.includes(pattern);

      switch (Number(filterCompletedToDos)) {
        case FilterToDosBy.all:
          return includePattern;

        case FilterToDosBy.completed:
          return includePattern && toDo.completed === true;

        case FilterToDosBy.active:
          return includePattern && toDo.completed === false;

        default:
          return toDo;
      }
    }));
  }, [query, toDos, filterCompletedToDos]);

  const randomize = useCallback((arr) => {
    if (isRandomized) {
      for (let i = arr.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));

        // eslint-disable-next-line no-param-reassign
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }, [query,
    toDos,
    filterCompletedToDos,
    isRandomized]);

  const filteredArr = filter();

  randomize(filteredArr);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__Filter-options">
        <label>
          Title contain:
          <input
            type="text"
            value={query}
            onChange={({ target }) => {
              dispatch(setNewQuery(target.value));
            }}
          />
        </label>

        <label>
          Show only:
          <select
            value={filterCompletedToDos}
            onChange={({ target }) => {
              setFilterCompletedToDos(target.value as unknown as FilterToDosBy);
            }}
          >
            <option value={FilterToDosBy.all}>
              All
            </option>

            <option value={FilterToDosBy.active}>
              Active
            </option>

            <option value={FilterToDosBy.completed}>
              Completed
            </option>
          </select>
        </label>

        <button
          className={classNames(
            'button',
            'TodoList__user-button',
            {
              'TodoList__user-button--selected':
                isRandomized,
            },
          )}
          type="button"
          onClick={() => {
            setIsRandomized((prevValue) => !prevValue);
          }}
        >
          Randomize
        </button>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredArr.map(toDo => (
            <li
              className={classNames(
                'TodoList__item',
                {
                  'TodoList__item--unchecked': !toDo.completed,
                  'TodoList__item--checked': toDo.completed,
                },
              )}
              key={toDo.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={toDo.completed}
                  readOnly
                />
                <p>{toDo.title}</p>
              </label>

              <button
                className={classNames(
                  'button',
                  'TodoList__user-button',
                  {
                    'TodoList__user-button--selected':
                      toDo.userId === selectedUserId,
                  },
                )}
                type="button"
                onClick={() => {
                  setSelectedUserId(toDo.userId);
                }}
              >
                User&nbsp;#
                {toDo.userId}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
