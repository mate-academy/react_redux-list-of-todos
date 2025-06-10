import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect, useState } from 'react';
import { getTodos } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { listTodos } from './features/todos';
import { RootState } from './app/store';
import { currentUser } from './features/currentTodo';
import { Todo } from './types/Todo';
import { setStatus } from './features/filter';

export const App = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const [modalClose, setModalClose] = useState(false);
  const [loader, setLoader] = useState(false);

  const [initialTodos, setInitialTodos] = useState<Todo[]>([]);
  const actualUser = useSelector((state: RootState) => state.currentUser);
  const statusTodo = useSelector((state: RootState) => state.filter.status);

  const [searchSelect, setSearchSelect] = useState<Todo[]>([]);

  const doSearch = (content: string) => {
    const searchTerm = content.toLowerCase();

    if (statusTodo === 'all') {
      if (content === '') {
        dispatch(listTodos(initialTodos));
        return;
      }

      dispatch(
        listTodos(
          initialTodos.filter(item =>
            item.title.toLowerCase().includes(searchTerm),
          ),
        ),
      );
    } else {
      dispatch(
        listTodos(
          searchSelect.filter(item =>
            item.title.toLowerCase().includes(searchTerm),
          ),
        ),
      );
    }
  };

  const doSearchSelect = (content: string) => {
    switch (content) {
      case 'all':
        dispatch(listTodos(initialTodos));
        dispatch(setStatus('all'));
        break;

      case 'active':
        const doFilterActive = initialTodos.filter(item => !item.completed);
        dispatch(setStatus('active'));
        dispatch(listTodos(doFilterActive));
        setSearchSelect(doFilterActive);
        break;

      case 'completed':
        const doFilterCompleted = initialTodos.filter(item => item.completed);
        dispatch(setStatus('completed'));
        dispatch(listTodos(doFilterCompleted));
        setSearchSelect(doFilterCompleted);
        break;
    }
  };

  const selectById = (selectId: number) => {
    const result = todos.find(item => item.id === selectId);

    if (result) {
      dispatch(currentUser(result));
      setModalClose(true);
    } else {
      setModalClose(false);
    }
  };

  useEffect(() => {
    setLoader(true);

    getTodos()
      .then(res => {
        dispatch(listTodos(res));
        setInitialTodos(res);
      })
      .finally(() => setLoader(false));
  }, [dispatch]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter doSearch={doSearch} doSearchSelect={doSearchSelect} />
            </div>

            <div className="block">{loader ? <Loader /> : <TodoList selectById={selectById} />}</div>
          </div>
        </div>
      </div>

      {modalClose && actualUser && (
        <TodoModal loader={loader} setModalClose={setModalClose} actualUser={actualUser} />
      )}
    </>
  );
};
