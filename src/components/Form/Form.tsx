import { useCallback } from 'react';
import './Form.scss';

type Props = {
  searchParams: any,
  navigate: any,
  sortQuery: string,
  filterQuery: string,
};

export const Form: React.FC<Props> = ({
  searchParams,
  navigate,
  sortQuery,
  filterQuery,
}) => {
  const handleInputChange = useCallback((value: any) => {
    if (value.length > 0) {
      searchParams.set('filter', value);
    } else {
      searchParams.delete('filter');
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, []);

  const handleSelectChange = useCallback((value: any) => {
    if (value.length === 0) {
      searchParams.delete('sortBy');
    } else {
      searchParams.set('sortBy', value);
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, []);

  return (
    <div className="form">
      <input type="text" value={filterQuery} onChange={e => handleInputChange(e.target.value)} />

      <select
        name="status"
        className="form_select"
        onChange={e => handleSelectChange(e.target.value)}
      >
        {sortQuery.length === 0 && (
          <>
            <option value="">all</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
          </>
        )}
        {sortQuery === 'active' && (
          <>
            <option value="active">active</option>
            <option value="">all</option>
            <option value="completed">completed</option>
          </>
        )}
        {sortQuery === 'completed' && (
          <>
            <option value="completed">completed</option>
            <option value="">all</option>
            <option value="active">active</option>
          </>
        )}
      </select>
    </div>
  );
};
