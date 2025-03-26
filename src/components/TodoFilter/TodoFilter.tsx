import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { filterSlice } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.filterReducer.status);
  const query = useAppSelector(state => state.filterReducer.query);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event =>
              dispatch(
                filterSlice.actions.setStatus(event.target.value as Status),
              )
            }
          >
            <option value={Status.all}>All</option>
            <option value={Status.active}>Active</option>
            <option value={Status.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={e => dispatch(filterSlice.actions.setQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(filterSlice.actions.setQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};

//   return (
//     <form
//       className="field has-addons"
//       onSubmit={event => event.preventDefault()}
//     >
//       <p className="control">
//         <span className="select">
//           <select data-cy="statusSelect">
//             <option value="all">All</option>
//             <option value="active">Active</option>
//             <option value="completed">Completed</option>
//           </select>
//         </span>
//       </p>

//       <p className="control is-expanded has-icons-left has-icons-right">
//         <input
//           data-cy="searchInput"
//           type="text"
//           className="input"
//           placeholder="Search..."
//         />
//         <span className="icon is-left">
//           <i className="fas fa-magnifying-glass" />
//         </span>

//         <span className="icon is-right" style={{ pointerEvents: 'all' }}>
//           {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
//           <button
//             data-cy="clearSearchButton"
//             type="button"
//             className="delete"
//           />
//         </span>
//       </p>
//     </form>
//   );
// };
