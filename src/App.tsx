import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { getTodos } from './api';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(Status.all);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  const filteredList = useMemo(() => {
    const filteredByQuery = todos.filter(todo =>
      todo.title.toLocaleLowerCase().includes(appliedQuery.toLocaleLowerCase()),
    );

    switch (selectedStatus) {
      case Status.active:
        return filteredByQuery.filter(todo => !todo.completed);
      case Status.completed:
        return filteredByQuery.filter(todo => todo.completed);
      default:
        return filteredByQuery;
    }
  }, [appliedQuery, todos, selectedStatus]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                setAppliedQuery={setAppliedQuery}
                appliedQuery={appliedQuery}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                todos.length > 0 && (
                  <TodoList
                    selectTodo={setSelectedTodo}
                    selectedTodoId={selectedTodo?.id}
                    filteredList={filteredList}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} close={() => setSelectedTodo(null)} />
      )}
    </>
  );
};
