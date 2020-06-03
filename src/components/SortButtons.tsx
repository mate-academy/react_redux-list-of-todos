import React, { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setSortField, setReverse } from '../store';

const buttonsSort = ['id', 'title', 'completed', 'name'];

const SortButtons: React.FC = () => {
  const dispatch = useDispatch();
  const hendleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = (e.target as HTMLButtonElement);

    dispatch(setSortField(name));
    dispatch(setReverse());
  };

  return (
    <tr>
      {buttonsSort.map(item => (
        <th key={item}>
          <button
            type="button"
            name={item}
            className="btnSort"
            onClick={hendleOnClick}
          >
            By
            {' '}
            {item}
          </button>
        </th>
      ))}
    </tr>
  );
};

export default SortButtons;
