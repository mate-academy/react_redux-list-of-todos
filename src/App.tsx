import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './api/api';
import { UserForm } from './components/UserForm/UserForm';
import { UsersTable } from './components/UsersTable';
import { actions, selectors } from './store';
import './styles/main.scss';

export const App = () => {
  const messageError = useSelector(selectors.getMessageError);
  const isOpenForm = useSelector(selectors.getIsOpenForm);
  const isCorrectForm = useSelector(selectors.getIsCorrectForm);
  const dispatch = useDispatch();

  const handlerOpenForm = useCallback(() => {
    dispatch(actions.getIsOpenForm(true));
    dispatch(actions.getIsCorrectForm(false));
  }, []);

  useEffect(() => {
    async function response() {
      try {
        const usersFromServer = await getUsers();

        dispatch(actions.getUsers(usersFromServer));
      } catch {
        dispatch(actions.getError('Can not load todos'));
      }
    }

    response();
  }, []);

  return (
    <main className="App">
      <h1 className="App__title">
        Information about users of our products.
      </h1>
      <button
        type="button"
        className="App__button
        App__button--opener"
        hidden={isOpenForm || isCorrectForm}
        onClick={handlerOpenForm}
      >
        Open form for user
      </button>
      {messageError.length === 0
        ? (
          <>
            <UserForm />
            <UsersTable />
          </>
        )
        : (<p className="App__error">{messageError}</p>)}
    </main>
  );
};
