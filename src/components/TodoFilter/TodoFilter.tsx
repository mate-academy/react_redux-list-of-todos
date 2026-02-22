import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';
import type { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  return (
    <form className="box mb-5" onSubmit={e => e.preventDefault()}>
      <div className="field">
        <p className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={e => dispatch(setQuery(e.target.value))}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="tabs is-toggle is-fullwidth">
        <ul>
          <li className={status === 'all' ? 'is-active' : ''}>
            <a
              href="#/"
              onClick={e => {
                e.preventDefault();
                dispatch(setStatus('all'));
              }}
            >
              All
            </a>
          </li>

          <li className={status === 'active' ? 'is-active' : ''}>
            <a
              href="#/"
              onClick={e => {
                e.preventDefault();
                dispatch(setStatus('active'));
              }}
            >
              Active
            </a>
          </li>

          <li className={status === 'completed' ? 'is-active' : ''}>
            <a
              href="#/"
              onClick={e => {
                e.preventDefault();
                dispatch(setStatus('completed'));
              }}
            >
              Completed
            </a>
          </li>
        </ul>
      </div>
    </form>
  );
};
