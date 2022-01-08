import { FC } from 'react';
import { Dropdown } from '../../ui/Dropdown';

type Props = {
  query: string,
  setQuery: (text: string) => void,
  dropdownList: string[],
  status: string,
  handleStatus: (newStatus: string) => void,
};

export const TodoListFilters: FC<Props> = ({
  query,
  setQuery,
  dropdownList,
  status,
  handleStatus,
}) => {
  return (
    <div className="TodoListFilters mb-4 d-flex">
      <input
        type="text"
        className="form-control me-3"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="w-25">
        <Dropdown
          defaultValue={status}
          switchValue={handleStatus}
          dropdownList={dropdownList}
        />
      </div>
    </div>
  );
};
