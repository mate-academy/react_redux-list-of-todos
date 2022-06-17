import classNames from 'classnames';
import React, { SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser } from '../../api/api';
import { actions, selectors } from '../../store';
import '../../styles/main.scss';

export const UserForm: React.FC = () => {
  const isOpenForm = useSelector(selectors.getIsOpenForm);
  const isCorrectForm = useSelector(selectors.getIsCorrectForm);
  const IdCorrectUser = useSelector(selectors.getUserId);
  const correctedUser = useSelector(selectors.getUser);
  // const loadedUsers = useSelector(selectors.loadUsers);
  const dispatch = useDispatch();
  const [nameUser, setNameUser] = useState('');
  const [surnameUser, setSurnameUser] = useState('');
  const [descUser, setDescUser] = useState('');
  const [userId, setUserId] = useState(0);
  const [version, setVersion] = useState(0);
  const [textError, setTextError] = useState('');
  const [isName, setIsName] = useState(true);
  const [isSurname, setIsSurname] = useState(true);
  const [isDesc, setIsDesc] = useState(true);
  const [isUserId, setIsUserId] = useState(true);
  const [isVersion, setIsVersion] = useState(true);
  // const [isUserIdExist, setUserIdExist] = useState(false);
  // const [textErrorId, setTextErroId] = useState('');

  const handlerCloseForm = () => {
    dispatch(actions.getIsOpenForm(false));
    dispatch(actions.getIsCorrectForm(false));
  };

  const resetFields = () => {
    setNameUser('');
    setSurnameUser('');
    setDescUser('');
    setUserId(0);
    setVersion(0);
  };

  const chekName = () => {
    if (nameUser.trim().length > 0) {
      setIsName(true);

      return true;
    }

    setIsName(false);

    return false;
  };

  const chekSurname = () => {
    if (surnameUser.trim().length > 0) {
      setIsSurname(true);

      return true;
    }

    setIsSurname(false);

    return false;
  };

  const chekDesc = () => {
    if (descUser.trim().length > 0) {
      setIsDesc(true);

      return true;
    }

    setIsDesc(false);

    return false;
  };

  const chekUserId = () => {
    if (userId > 0) {
      setIsUserId(true);

      return true;
    }

    setIsUserId(false);

    return false;
  };

  const chekVersion = () => {
    if (version > 0) {
      setIsVersion(true);

      return true;
    }

    setIsVersion(false);

    return false;
  };

  const handlerAddUser = (event: SyntheticEvent) => {
    event.preventDefault();
    const isNameValid = chekName();
    const isSurnameValid = chekSurname();
    const isDescValid = chekDesc();
    const isUserIdValid = chekUserId();
    const isVersionValid = chekVersion();

    if (isNameValid
      && isSurnameValid
      && isDescValid
      && isUserIdValid
      && isVersionValid
    ) {
      const newUserInfo = {
        _id: String(+new Date()),
        name: nameUser,
        surname: surnameUser,
        desc: descUser,
        user_id: userId,
        // eslint-disable-next-line no-underscore-dangle
        __v: version,
      };

      setTextError('');
      dispatch(actions.getIsOpenForm(false));
      dispatch(actions.updateLocalUsers(newUserInfo));
      createUser(newUserInfo);
      resetFields();
    } else {
      setTextError('Please enter correct data');
    }
  };

  const handlerCorrectUser = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(actions.getIsCorrectForm(false));
    dispatch(actions.getIsOpenForm(false));

    const correctUserInfo = correctedUser;

    if (nameUser.trim().length > 0) {
      correctUserInfo.name = nameUser;
    }

    if (surnameUser.trim().length > 0) {
      correctUserInfo.surname = surnameUser;
    }

    if (descUser.trim().length > 0) {
      correctUserInfo.desc = descUser;
    }

    if (userId > 0) {
      correctUserInfo.user_id = userId;
    }

    if (version > 0) {
      // eslint-disable-next-line no-underscore-dangle
      correctUserInfo.__v = version;
    }

    updateUser(IdCorrectUser, correctUserInfo);
    dispatch(actions.updateLocalUsers(correctUserInfo));
    resetFields();
  };

  return (
    <div className={classNames(
      'UserForm',
      {
        'UserForm--active': isOpenForm || isCorrectForm,
      },
    )}
    >
      <fieldset
        className="UserForm__fieldset"
      >
        <legend
          className="UserForm__subtitle"
        >
          Enter iformation about the user
        </legend>
        <button
          type="button"
          className="UserForm__button-close"
          onClick={handlerCloseForm}
        >
          Close form without adding
        </button>
        <form
          method="POST"
          className="UserForm__form"
        >
          <div className="UserForm__form--container-out">
            <div className="UserForm__form--container-in">
              <div className="UserForm__field">
                <p className="UserForm__name">
                  Input name:
                </p>
                <input
                  className="UserForm__input
                  UserForm__input--name"
                  type="text"
                  name="name"
                  placeholder="name"
                  value={nameUser}
                  onChange={(event) => setNameUser(event.target.value)}
                />
              </div>
              {!isName ? (
                <p className="UserForm__error">{textError}</p>
              ) : (
                <p className="UserForm__error" />
              )}
              <div className="UserForm__field">
                <p className="UserForm__name">
                  Input surname:
                </p>
                <input
                  className="UserForm__input
                  UserForm__input--username"
                  type="text"
                  name="surname"
                  placeholder="username"
                  value={surnameUser}
                  onChange={(event) => setSurnameUser(event.target.value)}
                />
              </div>
              {!isSurname ? (
                <p className="UserForm__error">{textError}</p>
              ) : (
                <p className="UserForm__error" />
              )}
              <div className="UserForm__field">
                <p className="UserForm__name">
                  Input description:
                </p>
                <textarea
                  className="UserForm__input
                  UserForm__input--desc"
                  cols={30}
                  name="desc"
                  placeholder="..."
                  value={descUser}
                  onChange={(event) => setDescUser(event.target.value)}
                />
              </div>
              {!isDesc ? (
                <p className="UserForm__error">{textError}</p>
              ) : (
                <p className="UserForm__error" />
              )}
            </div>

            <div className="UserForm__form--container-in">
              <div className="UserForm__field">
                <p className="UserForm__name">
                  Input ID of user:
                </p>
                <input
                  className="UserForm__input
                  UserForm__input--userId"
                  type="number"
                  name="userId"
                  placeholder="not used"
                  readOnly={isCorrectForm}
                  disabled={isCorrectForm}
                  value={isCorrectForm ? ('') : `${userId}`}
                  onChange={(event) => setUserId(+event.target.value)}
                />
              </div>
              {!isUserId ? (
                <p className="UserForm__error">{textError}</p>
              ) : (
                <p className="UserForm__error" />
              )}
              <div className="UserForm__field">
                <p className="UserForm__name">
                  Input version:
                </p>
                <input
                  className="UserForm__input
                  UserForm__input--version"
                  type="number"
                  name="version"
                  placeholder="245"
                  required
                  value={version}
                  onChange={(event) => setVersion(+event.target.value)}
                />
              </div>
              {!isVersion ? (
                <p className="UserForm__error">{textError}</p>
              ) : (
                <p className="UserForm__error" />
              )}
            </div>
          </div>
          <div className="UserForm__buttons">
            <button
              type="submit"
              className={classNames(
                'UserForm__button-add',
                {
                  'UserForm__button-add--passive': isCorrectForm,
                },
              )}
              disabled={!isOpenForm}
              onClick={(event) => handlerAddUser(event)}
            >
              Add a new user
            </button>
            <button
              type="submit"
              className={classNames(
                'UserForm__button-add',
                {
                  'UserForm__button-add--passive': isOpenForm,
                },
              )}
              disabled={!isCorrectForm}
              onClick={(event) => handlerCorrectUser(event)}
            >
              Correct the user
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};
