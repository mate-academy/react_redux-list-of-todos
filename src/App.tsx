import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Todos } from './components/Todos/Todos';
import { TodoModal } from './components';
import { useAppSelector } from './hooks/useAppSelector';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <>
      <div className="section">
        <div className="container"></div>
      </div>

      <Todos />
      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
