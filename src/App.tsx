import { useSearchParams, useNavigate } from 'react-router-dom';
import { TodoList } from './components/TodoList/TodoList';
import { CurrentUser } from './components/CurrentUser/CurrentUser';
import { Form } from './components/Form/Form';
import './App.scss';

const App = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams() || '';
  const filterQuery = searchParams.get('filter') || '';
  const userQuery = searchParams.get('userId') || '';
  const sortQuery = searchParams.get('sortBy') || '';

  return (
    <div className="App">
      <h1
        className="App__title"
      >
        Redux list of todos
      </h1>

      <Form
        searchParams={searchParams}
        navigate={navigate}
        sortQuery={sortQuery}
        filterQuery={filterQuery}
      />

      <div className="main">
        <TodoList
          filterQuery={filterQuery}
          sortQuery={sortQuery}
        />
        {userQuery ? (
          <CurrentUser
            userQuery={userQuery}
            searchParams={searchParams}
          />
        ) : (
          <div className="user">Please choose user</div>
        )}
      </div>
    </div>
  );
};

export default App;
