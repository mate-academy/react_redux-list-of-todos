import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgCloseR } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../reducer/actions';
import { RootState } from '../../reducer/rootReducer';
import './CurrentUser.scss';

type Props = {
  userQuery: any,
  searchParams: any,
};

export const CurrentUser: React.FC<Props> = ({
  userQuery,
  searchParams,
}) => {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    searchParams.delete('userId');

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, []);

  useEffect(() => {
    dispatch(selectUser(userQuery));
  }, [userQuery]);

  return (
    <>
      <div className="user">
        <h1 className="user__title">{user.name}</h1>
        <p className="user__info">{user.email}</p>
        <p className="user__info">{user.phone}</p>
        <CgCloseR
          className="user__button"
          onClick={handleClick}
        />
      </div>
    </>
  );
};
