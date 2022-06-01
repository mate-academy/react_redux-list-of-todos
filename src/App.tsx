import './App.scss';
import './styles/general.scss';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodosList/TodosList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { todosLoad } from './store/actions';
import { RootState } from './store/store';
import { User } from './types/User';

const App: FC = () => {
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
        <div className="App__content">
          <div className="App__content-container">
            {currentUser ? (
              <CurrentUser />
            ) : 'No user selected'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
