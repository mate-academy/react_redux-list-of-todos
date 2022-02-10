import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypeSelector';

export const TopFilterLine: React.FC = () => {
  const { searchQuery, todoStatus } = useTypedSelector(state => state.todos);

  const { setSearchQuery, setTodosStatus } = useActions();

  return (
    <>
      <input
        className="input is-rounded"
        type="text"
        placeholder="Rounded input"
        value={searchQuery}
        onChange={(event) => {
          setSearchQuery(event.target.value);
        }}
      />
      <div className="select is-rounded">
        <select
          value={todoStatus}
          onChange={(event) => {
            setTodosStatus(event.target.value);
          }}
        >
          <option value="all">Show all</option>
          <option value="active">Show active</option>
          <option value="completed">Show completed</option>
        </select>
      </div>
    </>
  );
};
