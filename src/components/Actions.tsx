import React, { FC } from 'react';
import { connect } from 'react-redux';
import { setQuerySort } from '../redux/actions';

interface Props {
  setQuery: (query: string) => void;
}

const ActionsTemplate: FC<Props> = ({
  setQuery,
}) => (
  <>
    <button
      className="button"
      type="button"
      onClick={() => setQuery('title')}
    >
      Sort by title
    </button>

    <button
      className="button"
      type="button"
      onClick={() => setQuery('user')}
    >
      Sort by user
    </button>

    <button
      className="button"
      type="button"
      onClick={() => setQuery('completed')}
    >
      Sort by completed
    </button>

    <button
      className="button"
      type="button"
      onClick={() => setQuery('reverse')}
    >
      Reverse
    </button>
  </>
);

const mapDispatchToProps = {
  setQuery: setQuerySort,
};

export const Actions = connect(
  null,
  mapDispatchToProps,
)(ActionsTemplate);
