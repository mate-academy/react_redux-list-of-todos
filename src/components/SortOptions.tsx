import React, { FC } from 'react';
import { connect } from 'react-redux';

import { SortOption, SortOptionAction } from '../constants/types';
import { setSortOption } from '../actions/index';

interface Props {
  setSortOption(option: SortOption): SortOptionAction;
}


const SortOptionsTemplate: FC<Props> = (props) => {
  const { setSortOption: SortOptionActionActionCreator } = props;

  return (
    <div>
      <button
        type="button"
        onClick={() => SortOptionActionActionCreator('title')}
      >
        Sort by title
      </button>
      <button
        type="button"
        onClick={() => SortOptionActionActionCreator('completeness')}
      >
        Sort by completeness
      </button>
      <button
        type="button"
        onClick={() => SortOptionActionActionCreator('name')}
      >
        Sort by name
      </button>
    </div>
  );
};

export const SortOptions = connect(
  null,
  { setSortOption },
)(SortOptionsTemplate);
