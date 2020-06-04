import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Segment } from 'semantic-ui-react';
import * as api from './helpers/api';
import './App.scss';
import {
  startLoading,
  finishLoading,
  setLoaded,
  setError,
  initTodos,
  getLoading,
  getLoaded,
  getError,
  getTodos,
  // getQuery,
} from './store';
import TodoList from './components/TodoList';

const getAppData = async (): Promise<Todo[]> => {
  const todosFromServer = await api.getTodos();
  const users = await api.getUsers();

  await new Promise(ok => setTimeout(ok, 2000));

  return todosFromServer.map((todo: Todo) => ({
    ...todo,
    user: users.find((user: User) => user.id === todo.userId) || undefined,
  }));
};

const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodos);
  const loading = useSelector(getLoading);
  const loaded = useSelector(getLoaded);
  const error = useSelector(getError);
  // const query = useSelector(getQuery);

  const loadData = () => {
    dispatch(startLoading());

    getAppData()
      .then(todosFromServer => {
        dispatch(initTodos(todosFromServer));
        dispatch(setLoaded());
      })
      .catch(err => {
        dispatch(setError(`Something went wrong: ${err.message}`));
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  };

  return (
    <Segment inverted className="App Application">
      <Header as="h1" color="orange" content="Redux list of todos" />
      {loaded ? (
        <TodoList list={todos} />
      ) : (
        <Button
          content="Load Todo"
          loading={loading}
          color="orange"
          size="big"
          onClick={loadData}
        />
      )}
      <Header as="h2" color="yellow">{error}</Header>
    </Segment>
  );
};

export default App;
