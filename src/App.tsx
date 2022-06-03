import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { CurrentUser } from './components/CurrentUser';
import { getTodos } from './api/api';
import { ACTIONS } from './store/actions';
import { getTodoSelector, getUserIdSelector } from './store/selectors';

const App: React.FC = () => {
  const todos = useSelector(getTodoSelector);
  const selectedUserId = useSelector(getUserIdSelector);
  const dispatch = useDispatch();
  const { addTodos } = ACTIONS;
  // const [selectedUserId, setSelectedUserId] = useState(0);
  // const [todos, setTodos] = useState<Todo[] | null>(null);
  const [errorText, setErrorText] = useState('');
  // const [query, setQuery] = useState('');
  // const [selectValue, setSelectValue] = useState('');

  useEffect(() => {
    const getDataFromServer = async () => {
      try {
        const dataFromServer = await getTodos();

        dispatch(addTodos(dataFromServer));
      } catch (error) {
        setErrorText('Can\'t download data from server!');
      }
    };

    getDataFromServer();
  });

  if (errorText) {
    return (
      <div>
        {errorText}
      </div>
    );
  }

  // const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setQuery(event.target.value);
  // };

  // const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectValue(event.target.value);
  // };

  // const getVisibleTodos = (
  //   todosFromServer: Todo[],
  //   queryFromInput: string,
  // ): Todo[] => {
  //   let filteredTodos = todos;

  //   filteredTodos = todosFromServer.filter(todo => (
  //     todo.title.toLowerCase().includes(queryFromInput.toLowerCase())
  //   ));

  //   switch (selectValue) {
  //     case TodoStatus.Active:
  //       return filteredTodos.filter(todo => !todo.completed);
  //     case TodoStatus.Completed:
  //       return filteredTodos.filter(todo => todo.completed);

  //     case TodoStatus.All:
  //     default:
  //       return filteredTodos;
  //   }
  // };

  return (
    <div className="App">
      <div className="App__sidebar">
        {/* <h2>Todos:</h2>

        <input
          type="text"
          className="TodoList__input"
          placeholder="Type search word"
          value={query}
          onChange={handleChangeInput}
        />

        <select
          className="TodoList__select"
          onChange={handleChangeSelect}
          value={selectValue}
        >
          {Object.keys(TodoStatus).map(key => (

            <option
              value={key}
              key={key}
            >
              {key}
            </option>

          ))}
        </select> */}

        {todos ? (
          <TodoList />
        ) : (
          <p>loading...</p>
        )}
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {selectedUserId ? (
            <CurrentUser
              userId={selectedUserId}
            />
          ) : 'No user selected'}
        </div>
      </div>
    </div>
  );
};

export default App;

// import { useSelector } from 'react-redux';

// import './App.scss';
// import Start from './components/Start';
// import { Finish } from './components/Finish';

// import { isLoading, getMessage } from './store';

// const App = () => {
//   const loading = useSelector(isLoading);
//   const message = useSelector(getMessage) || 'Ready!';

//   return (
//     <div className="App">
//       <h1>Redux list of todos</h1>
//       <h2>{loading ? 'Loading...' : message}</h2>

//       <Start title="Start loading" />
//       <Finish title="Succeed loading" message="Loaded successfully!" />
//       <Finish
//         title="Fail loading"
//         message="An error occurred when loading data."
//       />
//     </div>
//   );
// };

// export default App;
