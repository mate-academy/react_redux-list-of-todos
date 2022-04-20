import React, { FC, memo } from 'react';
import classNames from 'classnames';

interface Option {
  id: number,
  name: string,
}

interface Props {
  name: string,
  label: string,
  inputValue: string,
  errorMessage: string,
  options: Option[],
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const SelectInput: FC<Props> = memo(({
  name, label, inputValue, errorMessage, options, onChange,
}) => {
  return (
    <div className="field">
      <label htmlFor="todo" className="label">
        {label}
        <div className="control">
          <div className={classNames('select', { 'is-danger': errorMessage })}>
            <select
              id={name}
              name={name}
              value={inputValue}
              onChange={onChange}
            >
              {options.map(option => (
                <option key={option.id} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </label>
      {errorMessage && (<p className="help is-danger">{errorMessage}</p>)}
    </div>
  );
});
