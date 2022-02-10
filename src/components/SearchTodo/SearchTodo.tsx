import React from 'react';

enum TodoStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type Props = {
  query: string,
  todoStatus: TodoStatus,
  handleChange: (input: string) => void,
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void,
};

export const SearchTodo: React.FC<Props> = ({
  query,
  todoStatus,
  handleChange,
  handleSelect,
}) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Text input"
      name="query"
      value={query}
      onChange={(event) => handleChange(event.target.value)}
    />
    <div className="select">
      <select
        name="todoStatus"
        value={todoStatus}
        onChange={handleSelect}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  </form>
);
