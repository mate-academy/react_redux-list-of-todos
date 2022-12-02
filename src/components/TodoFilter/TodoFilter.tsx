import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
// import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/filter';

type Props = {
  // setStatusSelect: (item: string) => void;
  // setQuery: (item: string) => void;
  // query: string;
};

// export const TodoFilter: React.FC<Props> = ({
//   // setStatusSelect,
//   // setQuery,
//   // query,
// }) => {

export const TodoFilter: React.FC<Props> = () => {
  const query = useAppSelector(state => state.filter.query);
  // const status = useAppSelector(state => state.filter.status);
  // const [query, setQuery] = useState<string>('');

  // тест для функции
  // const filterBySearch = (todoTitle: string, queryText: string) => {
  //   return todoTitle.toLowerCase().includes(queryText);
  // };

  // console.log(query);
  // console.log(status);
  const dispatch = useDispatch();
  // const query
  // dispatch(actions.setActiveStatus)

  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // setStatusSelect(event.target.value);
    // dispatch(actions.setActiveStatus(event.target.value));
    switch (event.target.value) {
      case 'completed':
        return dispatch(actions.status(event.target.value));
      case 'active':
        return dispatch(actions.status(event.target.value));
        // походу нужен екшен и для ол чтобы это можно было задиспачить

      case 'all':
        return dispatch(actions.status(event.target.value));

      default:
        return event.target.value;
    }

    // const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //   // setStatusSelect(event.target.value);
    //   // dispatch(actions.setActiveStatus(event.target.value));
    //   switch (event.target.value) {
    //     case 'completed':
    //       return dispatch(actions.setCompletedStatus(event.target.value));
    //     case 'active':
    //       return dispatch(actions.setActiveStatus(event.target.value));
    //       // походу нужен екшен и для ол чтобы это можно было задиспачить

    //     case 'all':
    //       return dispatch(actions.setAllStatus(event.target.value));

  //     default:
  //       return event.target.value;
  //   }
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setQuery(event.target.value);
    // dispatch(actions.setQuery(event.target.value));
    dispatch(actions.query(event.target.value));
  };

  const clearSearchBar = () => {
    // setQuery('');
    // dispatch(actions.clearQuery());
    dispatch(actions.query(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusSelect}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleQuery}
          value={query}
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
              onClick={clearSearchBar}
            />
          </span>
        )}
      </p>
    </form>
  );
};
