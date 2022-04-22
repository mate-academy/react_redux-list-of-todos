/* eslint-disable no-console */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bulma/css/bulma.min.css';

import {
  loadTodosSelector,
  getSelectedUserIdSelector,
} from './store/selectors';
import { ACTIONS_CREATORS } from './store/actions/todos.actions';
// import { loadUsers } from './store/actions/users.actions';
import { UserDetails } from './components/UserDetails/UserDetails';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

const App = () => {
  const todos = useSelector(loadTodosSelector);
  const selectedUserId = useSelector(getSelectedUserIdSelector);

  const dispatch = useDispatch();
  const { loadTodos } = ACTIONS_CREATORS;

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  // useEffect(() => {
  //   dispatch(loadUsers());
  // }, []);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList
          todos={todos}
        />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <UserDetails
              userId={selectedUserId}
              // onClear={onClearUser}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
    // <div className="App">
    //   <ul className="TodoList">
    //     {todos.map(({ title, id, userId }) => (
    //       <li key={id}>
    //         <p>{title}</p>
    //         <button
    //           type="button"
    //           onClick={() => dispatch(setSelectedUserId(userId))}
    //         >
    //           Open
    //         </button>
    //         <button type="button">Delete</button>
    //       </li>
    //     ))}
    //   </ul>

  //   <div className="App__content">
  //     <div className="App__content-container">
  //       {selectedUserId ? (
  //         <UserDetails
  //           userId={selectedUserId}
  //         />
  //       ) : 'No user selected'}
  //     </div>
  //   </div>
  // </div>
  );
};

export default App;

/**
 * import Start from './components/Start';
import { Finish } from './components/Finish';
import { isLoading, getMessage, loadingTodos } from './store/selectors';
import { getUsers } from './data/api';
import { UserDetails } from './components/UserDetails';

 *   const loading = useSelector(isLoading);
  const message = useSelector(getMessage) || 'Ready!';

 *     <div className="App">
      <h1>Redux list of todos</h1>
      <h2>{loading ? 'Loading...' : message}</h2>

      <Start title="Start loading" />
      <Finish title="Succeed loading" message="Loaded successfully!" />
      <Finish
        title="Fail loading"
        message="An error occurred when loading data."
      />
    </div>
 */
