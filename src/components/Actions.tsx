import React, { FC } from 'react';
import { connect } from 'react-redux';

interface Props {
  setTitleSort: () => void;
  setUserSort: () => void;
  setCompleteSort: () => void;
  setReverseTodos: () => void;
}

const ActionsTemplate: FC<Props> = ({
  setTitleSort, setUserSort, setCompleteSort, setReverseTodos,
}) => (
  <>
    <button className="button" type="button" onClick={setTitleSort}>Sort by title</button>
    <button className="button" type="button" onClick={setUserSort}>Sort by user</button>
    <button className="button" type="button" onClick={setCompleteSort}>Sort by completed</button>
    <button className="button" type="button" onClick={setReverseTodos}>Reverse</button>
  </>
);

const mapStateToProps = (state: GlobalState) => ({ ...state });

const mapDispatchToProps = (dispatch: (arg0: { type: string }) => unknown) => {
  return {
    setTitleSort: () => dispatch({ type: 'SORT_BY_TITLE' }),
    setUserSort: () => dispatch({ type: 'SORT_BY_USER' }),
    setCompleteSort: () => dispatch({ type: 'SORT_BY_COMPLETED' }),
    setReverseTodos: () => dispatch({ type: 'REVERSE_TODOS' }),
  };
};

export const Actions = connect(mapStateToProps, mapDispatchToProps)(ActionsTemplate);
