import '../../styles/main.scss';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableBody } from '../TableBody';
import { actions, selectors } from '../../store';
import { User } from '../../types/UserType';

export const UsersTable: React.FC = () => {
  const loadedUsers: User[] = useSelector(selectors.loadUsers);
  const start: number = useSelector(selectors.getStartIndex);
  const dispatch = useDispatch();
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(true);

  const handlerNext = () => {
    const index = start + 5;
    const amountUsers = loadedUsers.length;

    if (index < amountUsers) {
      dispatch(actions.getStartIndex(index));
      setIsNext(false);
      setIsPrev(false);
    }

    if (index >= amountUsers - 5) {
      setIsNext(true);
    }
  };

  const handlerPrev = () => {
    const index = start - 5;

    if (index >= 0) {
      dispatch(actions.getStartIndex(index));
      setIsPrev(false);
      setIsNext(false);
    }

    if (index <= 0) {
      setIsPrev(true);
    }
  };

  return (
    <>
      {loadedUsers.length > 0
        ? (
          <>
            <table className="UserTable">
              <caption className="UserTable__title">
                Information about members of our cooperative
              </caption>
              <thead className="UserTable__head">
                <tr
                  className="UserTable__head--row"
                >
                  <th
                    className="UserTable__head--cell"
                  >
                    Name
                  </th>
                  <th
                    className="UserTable__head--cell"
                  >
                    Surname
                  </th>
                  <th
                    className="UserTable__head--cell"
                  >
                    Description
                  </th>
                  <th className="UserTable__head--cell">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody
                className="UserTable__body"
              >
                <TableBody />
              </tbody>
            </table>

            <div className="UserTable__buttons">
              <button
                type="button"
                className="UserTable__button"
                disabled={isPrev}
                onClick={handlerPrev}
              >
                Previous 5
              </button>
              <button
                type="button"
                className="UserTable__button"
                disabled={isNext}
                onClick={handlerNext}
              >
                Next 5
              </button>
            </div>
          </>
        )
        : (
          <p className="UserTable__error">
            No information about users
          </p>
        )}
    </>
  );
};
