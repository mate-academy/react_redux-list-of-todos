import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { ButtonsData } from './ButtonData';

import {
  RootState,
  setFilter,
  getFilter,
} from '../../store';
import './Buttons.css';

const mapState = (state: RootState) => {
  return {
    filterType: getFilter(state),
  };
};

const mapDispatch = {
  filter: setFilter,
};

const connector = connect(mapState, mapDispatch);

const Buttons: React.FC = () => {
  const dispatch = useDispatch();
  const onFilterType = (title: string) => {
    const actionTitle = setFilter(title);

    dispatch(actionTitle);
  };

  return (
    <>
      {ButtonsData.map(button => (
        <button
          className="button"
          onClick={() => onFilterType(button.title)}
          key={button.title}
          type="button"
        >
          {button.title}
        </button>
      ))}
    </>
  );
};

export default connector(Buttons);
