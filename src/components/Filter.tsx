import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setQuery} from "../actions";
import {getQuery} from "../reducers";

const Filter = () => {
  const dispatch = useDispatch();
  const query = useSelector(getQuery)
  return (
    <div className="form-group mt-4">
      <input
        className="form-control"
        type="text"
        value={query}
        onChange={({target}) => dispatch(setQuery(target.value))}
      />
    </div>
  )
}


export default Filter;
