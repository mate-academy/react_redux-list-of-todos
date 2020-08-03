import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { TodosWithUser } from '../../interfaces';
import { getPrepearedTodos } from '../../api/api';
import Buttons from '../Buttons/Buttons';

import {
  RootState,
  isLoading,
  toggleLoading,
  getTodos,
  getNewTodos,
} from '../../store';

const mapState = (state: RootState) => {
  return {
    todos: getTodos(state),
    loading: isLoading(state),
  };
};

const mapDispatch = {
  load: toggleLoading,
  getTodosFromServer: getNewTodos,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
  todos: TodosWithUser[];
  loading: boolean;
};

const Start: React.FC<Props> = ({ todos, loading }) => {
  const dispatch = useDispatch();
  const getList = async () => {
    const actionLoading = toggleLoading();

    dispatch(actionLoading);
    const actionTodos = await getPrepearedTodos().then(data => getNewTodos(data));

    dispatch(actionTodos);
    dispatch(actionLoading);
  };

  return (
    <div>
      {!todos.length
        ? (
          <button
            type="button"
            onClick={getList}
            disabled={loading}
          >
            Load data
          </button>
        )
        : <Buttons />}
    </div>
  );
};

export default connector(Start);
