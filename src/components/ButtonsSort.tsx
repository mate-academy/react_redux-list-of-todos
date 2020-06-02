import React, { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setSortField } from '../store';

const buttonsSort = ['id', 'title', 'completed', 'name'];

const ButtonsSort: React.FC = () => {
  const dispatch = useDispatch();

  const hendleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = (e.target as HTMLButtonElement);

    dispatch(setSortField(name));
  };

  return (
    <tr>
      {buttonsSort.map(item => (
        <th>
          <button
            type="button"
            name={item}
            className="btnSort"
            onClick={e => hendleOnClick(e)}
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

export default ButtonsSort;
