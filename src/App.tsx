import { useEffect, FC } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentUser } from './components/CurrentUser';
import { TodoList } from './components/TodoList/TodoList';
import { RootState } from './store/store';
import { User } from './types/User';
import { loadTodos } from './store/actions';

const App: FC = () => {
  const currentUser: User | null = useSelector(
    (state: RootState) => state.reducer.currentUser,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__user">
        {currentUser ? (
          <CurrentUser />
        ) : 'No user selected'}
      </div>
    </div>
  );
};

export default App;
