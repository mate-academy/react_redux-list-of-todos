import axios from 'axios';
import { RootStateOrAny } from 'react-redux';
import { addTodosAction } from '../store/todosReducer';
import { userInfoAction } from '../store/userInfoReducer';

export const fetchTodos = () => {
  return (dispatch: RootStateOrAny) => {
    axios.get('https://mate.academy/students-api/todos')
      .then(res => {
        dispatch(addTodosAction(res.data));
      });
  };
};

export const fetchUserInfo = (userId: number) => {
  return (dispatch: RootStateOrAny) => {
    axios.get(`https://mate.academy/students-api/users/${userId}`)
      .then(res => {
        dispatch(userInfoAction(res.data));
      });
  };
};
