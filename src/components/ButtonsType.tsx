import React from 'react';
import { useDispatch } from 'react-redux';
import { setsortedTodos } from '../store';

const ButtonsType = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <button
        className="btn btn-info button"
        type="button"
        onClick={() => dispatch(setsortedTodos('sortByCompleted'))}
      >
        Sort by complete
      </button>
      <button
        className="btn btn-info button"
        type="button"
        onClick={() => dispatch(setsortedTodos('sortByTitle'))}
      >
        Sort by title
      </button>
      <button
        type="button"
        className="btn btn-info button"
        onClick={() => dispatch(setsortedTodos('sortByName'))}
      >
        Sort by Name
      </button>
    </div>
  );
};

export default ButtonsType;
