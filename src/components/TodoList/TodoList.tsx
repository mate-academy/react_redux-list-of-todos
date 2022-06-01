/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { FilterToDosBy } from '../../enums/FilterToDosBy';
import { ToDo } from '../../types/ToDo';
import './TodoList.scss';
import {
  selectors as selectorsToDo,
  setToDos,
  setFilterByQuery,
  setFilterCompletedToDos,
  setIsRandomized,
  removeToDoById,
} from '../../store/toDosSlice';
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setToDos([...toDos]));
  }, []);

  const toDoToShow = useAppSelector(selectorsToDo.filteredAndSortedToDos);
  const filterByQuery = useAppSelector(selectorsToDo.filterByQuery);
  const filterCompletedToDos
  = useAppSelector(selectorsToDo.filterCompletedToDos);
  const isRandomized = useAppSelector(selectorsToDo.isRandomized);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__Filter-options">
        <label>
          Title contain:
          <input
            type="text"
            value={filterByQuery}
            onChange={({ target }) => {
              dispatch(setFilterByQuery(target.value));
            }}
          />
        </label>

        <label>
          Show only:
          <select
            value={filterCompletedToDos}
            onChange={({ target }) => {
              // eslint-disable-next-line max-len
              dispatch(setFilterCompletedToDos(target.value as unknown as FilterToDosBy));
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
            dispatch(setIsRandomized(!isRandomized));
          }}
        >
          Randomize
        </button>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {toDoToShow.map(toDo => (
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

              <div className="TodoList__btns-container">
                {toDo.userId && (
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
                )}
                <button
                  className={classNames(
                    'button',
                    'TodoList__user-button',
                  )}
                  type="button"
                  onClick={() => {
                    dispatch(removeToDoById(toDo.id));
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
});
