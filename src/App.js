import React from 'react';
import { Button } from 'semantic-ui-react';
import TodoList from './components/TodoList';
import { todosURL, usersURL } from './API/getTodos';
import Buttons from './components/Buttons';
import { TodosContext, ForButtonsContext } from './context';
import './App.css';

// export const TodosContext = React.createContext([1, 2]);

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: false,
      initialized: false,
      currentSorter: 'byUser',
      preparedTodos: null,
      todosOnDisplay: null,
    };
  }

  // TodosContext = this.state.todosOnDisplay || this.state.preparedTodos;

  loadData = () => {
    this.setState({
      isLoading: true,
      error: false,
      initialized: true,
    });

    Promise.all([todosURL, usersURL])
      .then(([todoList, userList]) => {
        this.setState({
          preparedTodos: todoList.map(todo => ({
            ...todo,
            user: userList.find(user => todo.userId === user.id),
          })),
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          isLoading: false,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
          initialized: true,
        });
      });
  };

  switcher = (sorter) => {
    const todos = this.state.todosOnDisplay || this.state.preparedTodos;

    switch (sorter) {
      case 'byUser':
        this.setState(prevState => ({
          ...prevState,
          currentSorter: 'byUser',
          todosOnDisplay: todos.sort(
            (a, b) => a.user.name.localeCompare(b.user.name)
          ),
        }));
        break;
      case 'byTitle':
        this.setState(prevState => ({
          ...prevState,
          currentSorter: 'byTitle',
          todosOnDisplay: todos.sort(
            (a, b) => a.title.localeCompare(b.title)
          ),
        }));
        break;
      case 'byStatus':
        this.setState(prevState => ({
          ...prevState,
          currentSorter: 'byTitle',
          todosOnDisplay: todos.sort(
            (a, b) => a.completed - b.completed
          ),
        }));
        break;
      default:
        this.setState(prevState => ({
          ...prevState,
          todosOnDisplay: todos,
        }));
        break;
    }
  }

  refresher = () => {
    this.setState(prevState => ({
      ...prevState,
      todosOnDisplay: prevState.preparedTodos,
    }));
  }

  deleteUser = (id) => {
    const todos = this.state.todosOnDisplay || this.state.preparedTodos;

    this.setState(prevState => ({
      ...prevState,
      todosOnDisplay: todos.filter(item => item.id !== id),
    }));
  }

  static contextType = TodosContext;

  render() {
    const {
      isLoading, error, preparedTodos, todosOnDisplay,
    } = this.state;
    const todos = todosOnDisplay || preparedTodos;
    const { deleteUser } = this;
    const { switcher, refresher } = this;

    if (isLoading) {
      return <p>loading...</p>;
    }

    if (error) {
      return (
        <>
          <p>Error occurred!!!</p>
          <Button
            type="button"
            onClick={this.loadData}
          >
            Try Again!
          </Button>
        </>
      );
    }

    if (!preparedTodos) {
      return (
        <>
          <p>No users and todos yet!</p>
          <Button type="button" onClick={this.loadData} color="green">
            Load
          </Button>
        </>
      );
    }

    return (
      <div className="App">
        <h1>Dynamic list of todos</h1>
        <ForButtonsContext.Provider value={{
          switcher, refresher,
        }}
        >
          <Buttons />
        </ForButtonsContext.Provider>

        <TodosContext.Provider value={{
          todos, deleteUser,
        }}
        >
          <TodoList />
        </TodosContext.Provider>
      </div>
    );
  }
}

export default App;
