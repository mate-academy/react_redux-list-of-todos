import classNames from 'classnames';
import { FC, useState } from 'react';

type Props = {
  dropdownList: string[];
  defaultValue: string,
  switchValue: (value: string) => void,
};

export const Dropdown: FC<Props> = ({ dropdownList, defaultValue, switchValue }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (newSelected: string) => {
    switchValue(newSelected);
    setOpen(!open);
  };

  return (
    <div className="dropdown w-100">
      <button
        className={classNames('btn btn-secondary dropdown-toggle w-100', { show: open })}
        type="button"
        aria-expanded="false"
        onClick={() => setOpen(!open)}
      >
        {defaultValue}
      </button>
      <ul className={classNames('dropdown-menu dropdown-menu-dark', { show: open })}>
        {!!dropdownList.length && (
          dropdownList.map((el: string) => (
            defaultValue !== el && (
              <li
                key={el}
              >
                <button
                  type="button"
                  className="dropdown-item"
                  onClick={() => handleChange(el)}
                >
                  {el}
                </button>
              </li>
            )
          ))
        )}
      </ul>
    </div>
  );
};
