import React, { Dispatch } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, setSortField } from '../store';

const Sort: React.FC<Props> = ({ handleClick }) => {
  return (
    <div>
      <h2>Sort By:</h2>
      <button
        type="button"
        onClick={() => handleClick('completed')}
      >
        Completed
      </button>
      <button
        type="button"
        onClick={() => handleClick('title')}
      >
        Title
      </button>
      <button
        type="button"
        onClick={() => handleClick('userName')}
      >
        User name
      </button>
    </div>
  );
};

interface SetSortFieldInterface {
  type: string;
  sortField: string;
}

const mapState = (state: RootState) => ({
  sortField: state.sortField,
});

const mapDispatch = (dispatch: Dispatch<SetSortFieldInterface>) => ({
  handleClick: (sortField: string) => dispatch(setSortField(sortField)),
});

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

export default connector(Sort);
