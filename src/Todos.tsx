import React, { FC, useMemo } from 'react';
import { connect } from 'react-redux';
import { PreparedTodo } from './types';
import { TodoList } from './components/TodoList/TodoList';
import { getPreparedTodos } from './helpers_api';
import { State } from './store';


interface StateProps {
  todos: PreparedTodo[] | []
  isLoading: boolean
  isLoaded: boolean
  selectedSort: string
}

interface Methods {
  setTodos: (todosFromApi: PreparedTodo[]) => void;
  setIsLoading: (status: boolean) => void;
  setIsLoaded: () => void;
  setSelectedSort: (sort: string) => void;
}

type Props = StateProps & Methods;

export const TodosTemplate: FC<Props> = ({
  isLoading,
  setIsLoading,
  setIsLoaded,
  isLoaded,
  todos,
  setTodos,
  setSelectedSort,
  selectedSort
}) => {

  const showedAllTodos = async () => {
    setIsLoading(true);

    const todosFromApi = await getPreparedTodos();

    setTodos(todosFromApi);
    setIsLoading(false);
    setIsLoaded();
  }

  const sorted = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: typeOfSort } = event.target;
    setSelectedSort(typeOfSort);
  }

  const sortedTodos = useMemo(() => {
    return selectedSort === 'initual'
        ? [...todos]
        : [...todos].sort((aTodo, bTodo) => {
          switch(selectedSort) {
            case 'title':
              return aTodo.title.localeCompare(bTodo.title);
            case 'name':
              return aTodo.user && bTodo.user ? aTodo.user.name.localeCompare(bTodo.user.name) : 0;
            case 'completed':
              return Number(aTodo.completed) - Number(bTodo.completed);
            default:
            return 0;
          }
        })

  }, [todos, selectedSort]);

  if (isLoading) {
    return (
      <p className="loading">
      Loading...
      </p>
    );
  }

  return (
    <div className="app">
      <h1 className="title">Dynamic list of TODOs</h1>
      {(
        !isLoaded
        ? (
            <>
              <p className="initual_loading">
                Load your Todos
              </p>
              <button
                type="button"
                className="loading_button"
                onClick={showedAllTodos}
              >
                Load
              </button>
            </>
           )
          : (
            <>
              <select value={selectedSort}
                onChange={sorted}
                className="selected_button"
              >
                <option disabled value='choose'>Choose sort method</option>
                <option value='initual'>Initual view</option>
                <option value='title'>Title</option>
                <option value='name'>Name</option>
                <option value='completed'>Completed</option>
              </select>
              <table className="table">
                <thead>
                  <tr className="table__title">
                    <th className="table__cell">User</th>
                    <th className="table__cell">Todo</th>
                    <th className="table__cell">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <TodoList todosList={sortedTodos} />
                </tbody>
              </table>
            </>
          )
        )}
      </div>
    )
}

const mapStateToProps = (state: State) => ({
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  todos: state.todos,
  selectedSort: state.selectedSort
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    setIsLoading: (status: boolean) => dispatch({ type: 'SET_IS_LOADING', isLoading: status }),
    setIsLoaded: () => dispatch({ type: 'SET_IS_LOADED', isLoaded: true }),
    setTodos: (todosFromApi: PreparedTodo[]) => dispatch({ type: 'SET_TODOS', todos: todosFromApi }),
    setSelectedSort: (sort: string) => dispatch({ type: 'SET_SELECTED_SORT', selectedSort: sort })
  }
};

export const Todos = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodosTemplate)
