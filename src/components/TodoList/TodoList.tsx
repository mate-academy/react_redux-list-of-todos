import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

type Props = {
  selectById: (param: number) => void;
};

export const TodoList: React.FC<Props> = ({ selectById }) => {
  const todos = useSelector((state: RootState) => state.todos);

  if (todos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {todos.map(objc => (
          <tr data-cy="todo" key={objc.id}>
            <td className="is-vcentered">{objc.id}</td>
            {objc.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}
            <td className="is-vcentered is-expanded">
              <p className={objc.completed ? 'has-text-success' : 'has-text-danger'}>
                {objc.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => selectById(objc.id)}
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
