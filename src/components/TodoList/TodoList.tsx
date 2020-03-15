import React, { FC, useMemo } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { PreparedTodo } from '../../constants_types/types';
import { Todo } from '../Todo/Todo';
import { getPreparedTodos } from '../../helpers_api';
import { State } from '../../redux/store';
import { setIsLoading, setIsLoaded, setTodos, setSelectedSort } from '../../redux/actionCreators';


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

export const TodoListTemplate: FC<Props> = ({
  isLoading,
  setIsLoading,
  setIsLoaded,
  isLoaded,
  todos,
  setTodos,
  setSelectedSort,
  selectedSort
}) => {

  const showAllTodos = async () => {
    setIsLoading(true);

    const todosFromApi = await getPreparedTodos();

    setTodos(todosFromApi);
    setIsLoading(false);
    setIsLoaded();
  }

  const sortedBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: typeOfSort } = event.target;
    setSelectedSort(typeOfSort);
  }

  const sortedTodos = useMemo(() => {
    return selectedSort === 'initial'
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
      {(!isLoaded ? (
          <>
            <p className="initual_loading">
              Load your Todos
            </p>
            <button
              type="button"
              className="loading_button"
              onClick={showAllTodos}
            >
              Load
            </button>
          </>
         )
        : (
          <>
            <select value={selectedSort}
              onChange={sortedBy}
              className="selected_button"
            >
              <option disabled value='choose'>Choose sort method</option>
              <option value='initial'>Initial view</option>
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
                  <th className="table__cell">Delete</th>
                </tr>
              </thead>
              <tbody>
              <>
                {sortedTodos.map(todo => <Todo key={todo.id} todo={todo} />)}
              </>
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
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setIsLoading: (status: boolean) => dispatch(setIsLoading(status)),
    setIsLoaded: () => dispatch(setIsLoaded()),
    setTodos: (todosFromApi: PreparedTodo[]) => dispatch(setTodos(todosFromApi)),
    setSelectedSort: (sort: string) => dispatch(setSelectedSort(sort))
  }
};

export const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoListTemplate)
