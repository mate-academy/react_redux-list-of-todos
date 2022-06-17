import React, { SyntheticEvent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../api/api';
import { actions, selectors } from '../../store';
import { User } from '../../types/UserType';

export const TableBody: React.FC = () => {
  const loadedUsers: User[] = useSelector(selectors.loadUsers);
  const startIndex: number = useSelector(selectors.getStartIndex);
  const dispatch = useDispatch();

  let visibleUsers = loadedUsers.slice(startIndex, startIndex + 5);

  useEffect(() => {
    visibleUsers = loadedUsers.slice(startIndex, startIndex + 5);
  }, [loadedUsers]);

  const handlerRemoveUser = useCallback((IdOfUser: number) => {
    deleteUser(IdOfUser);
    dispatch(actions.deleteUser(IdOfUser));
  }, []);

  const handlerCorrectUser = useCallback(
    (IdOfUser: number, event: SyntheticEvent) => {
      event.preventDefault();
      dispatch(actions.getIsOpenForm(false));
      dispatch(actions.getIsCorrectForm(true));
      dispatch(actions.correctUser(IdOfUser));

      const userToCorrect: User[] = loadedUsers
        .filter(person => person.user_id === IdOfUser);

      if (userToCorrect) {
        dispatch(actions.getUser(userToCorrect[0]));
      }
    }, [],
  );

  return (
    <>
      {loadedUsers.length > 0 && (
        visibleUsers.map((person) => (
          <tr
            className="TableBody__body--row"
            // eslint-disable-next-line
            key={person._id}
          >
            <td className="TableBody__body--cell">
              <p className="TableBody__body--text">
                {person.name}
              </p>
              <button
                className="TableBody__body--button"
                type="button"
                onClick={(event) => handlerCorrectUser(person.user_id, event)}
              >
                Correct user
              </button>
            </td>
            <td className="TableBody__body--cell">
              {person.surname}
            </td>
            <td className="TableBody__body--cell">
              {person.desc}
            </td>
            <td className="TableBody__body--cell">
              <button
                type="button"
                className="TableBody__body--button"
                // eslint-disable-next-line no-underscore-dangle
                onClick={() => handlerRemoveUser(person.user_id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      )}
    </>
  );
};
