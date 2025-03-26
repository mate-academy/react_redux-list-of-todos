import { useAppDispatch } from '../../app/hooks';
import { setStatusFilter } from '../../features/filter';
import { Status } from '../../types/Status';

export const StatusFilter = () => {
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    dispatch(setStatusFilter(value as Status));
  };

  return (
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={handleChange}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>
  );
};
