import React from 'react';
import { Select } from '../FormComponents/Select';
import { Input } from '../FormComponents/Input';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setStatus } from '../../features/filter';
import { Status } from '../../types/Status';

type Props = {
  valueInput: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  valueInput,
  onChangeInput,
  onClearSearch,
}) => {
  const { status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const onSelectOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value as Status));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <Select onSelectOption={onSelectOption} status={status as Status} />
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <Input onChangeInput={onChangeInput} value={valueInput} />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {valueInput && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
