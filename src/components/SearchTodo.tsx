import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Input } from 'semantic-ui-react';
import { getQuery } from '../store';
import { setQuery } from '../store/query';

const optionQuery = {
  maxLength: 50,
  pattern: /[^a-z ]/ig,
};

const SearchTodo = () => {
  const dispatch = useDispatch();
  const query = useSelector(getQuery);

  return (
    <Input
      icon={<Icon name="search" inverted circular color="orange" />}
      className="SearchTodo"
      placeholder="Search..."
      size="large"
      value={query}
      onChange={({ target }) => {
        const { pattern, maxLength } = optionQuery;
        const queryVal = target.value
          .replace(pattern, '')
          .replace(/\s{2,}/g, ' ')
          .slice(0, maxLength);

        dispatch(setQuery(queryVal));
      }}
    />
  );
};

export default SearchTodo;
