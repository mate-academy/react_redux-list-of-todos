import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { todosLoad } from './store/actions';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { RootState } from './store/store';
import { User } from './types/User';
import './App.scss';

const App = () => {
  const currentUser: User | null = useSelector(
    (state: RootState) => state.reducer.currentUser,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todosLoad());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {currentUser ? (
            <CurrentUser />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;
