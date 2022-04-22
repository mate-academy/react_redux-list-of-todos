import { ChangeEvent, FC, memo } from 'react';

type Props = {
  titleValue: string,
  categoryValue: string,
  onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void,
  onChangeSelect: (event: ChangeEvent<HTMLSelectElement>) => void,
};

export const TodoForm: FC<Props> = memo(({
  titleValue,
  categoryValue,
  onChangeSelect,
  onChangeInput,
}) => {
  return (
    <form>
      <div className="control">
        <input
          className="input is-hovered"
          type="text"
          placeholder="Enter todo's name"
          value={titleValue}
          onChange={onChangeInput}
        />
      </div>

      <div className="select">
        <select
          value={categoryValue}
          onChange={onChangeSelect}
        >
          <option>All</option>
          <option>Active</option>
          <option>Completed</option>
        </select>
      </div>
    </form>
  );
});
