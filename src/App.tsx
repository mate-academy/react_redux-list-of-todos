import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './app/hooks';
import { useEffect, useMemo } from 'react';
import { setError, setLoading, setTodos } from './features/todos';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useAppSelector(state => state.todos);
  const { currentTodo } = useAppSelector(state => state.currentTodo)
  const { status, query } = useAppSelector(state => state.filter)

  useEffect(() => {
    dispatch(setLoading(true))

    getTodos()
      .then(todosFromApi => dispatch(setTodos(todosFromApi)))
      .catch(() => dispatch(setError('Error fetch data')))
      .finally(() => dispatch(setLoading(false)))
  }, [])

  const filteredTodos = useMemo(() => {
    let sorted: Todo[] = []

    switch (status) {
      case 'active':
        sorted = todos.filter(todo => !todo.completed)
        break;

      case 'completed':
        sorted = todos.filter(todo => todo.completed)
        break;

      default:
        sorted = todos
    }

    return sorted.filter(todo => 
      todo.title.toLowerCase().includes(query.toLowerCase().trim())
    )
  }, [todos, status, query])

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              <TodoList todos={filteredTodos} />
              {loading && <Loader />}
              {error && <p>{error}</p>}
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  )
}
