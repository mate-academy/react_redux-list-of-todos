import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header, Segment } from 'semantic-ui-react';
import './App.scss';

import * as api from './helpers/api';
import * as selectors from './store';
import * as loadingActions from './store/loading';
import { initTodos } from './store/todos';
import TodoList from './components/TodoList';
import SearchTodo from './components/SearchTodo';
import BackgroundAnimation from './components/common/BackgroundAnimation';

const getAppData = async (): Promise<Todo[]> => {
  const todosFromServer = await api.getTodos();
  const users = await api.getUsers();

  await new Promise(ok => setTimeout(ok, 1000));

  return todosFromServer.map((todo: Todo) => ({
    ...todo,
    user: users.find((user: User) => user.id === todo.userId) || undefined,
  }));
};

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.getLoading);
  const loaded = useSelector(selectors.getLoaded);
  const error = useSelector(selectors.getError);

  const loadData = () => {
    dispatch(loadingActions.startLoading());

    getAppData()
      .then(todosFromServer => {
        dispatch(initTodos(todosFromServer));
        dispatch(loadingActions.setLoaded());
      })
      .catch(err => {
        dispatch(loadingActions.setError(
          `Something went wrong: ${err.message}`,
        ));
      })
      .finally(() => {
        dispatch(loadingActions.finishLoading());
      });
  };

  return (
    <>
      <Segment className="App Application">
        <Header as="h1" color="orange" content="Redux list of todos" />
        {loaded ? (
          <>
            <SearchTodo />
            <TodoList />
          </>
        ) : (
          <Button
            className="App-LoadButton"
            content="Load Todo"
            loading={loading}
            disabled={loading}
            color="orange"
            size="big"
            onClick={loadData}
          />
        )}
        <Header as="h2" color="yellow">{error}</Header>
      </Segment>
      <BackgroundAnimation />
    </>
  );
};

export default App;
