import { request } from './API_URL';

export function todosFetchDataSuccess(todos: Todo[]) {
  return {
    type: 'todosFetchDataSuccess',
    todos,
  };
}

export function userFetchDataSuccess(user: User) {
  return {
    type: 'userFetchDataSuccess',
    user,
  };
}

export function userFetchDataFailed() {
  return {
    type: 'userFetchDataSuccess',
    user: null,
  };
}

export function todosFetchData(userId?: number) {
  let url = 'todos';

  if (userId) {
    url = `users/${userId}`;

    return (dispatch : any) => request(url)
      .then(result => dispatch(userFetchDataSuccess(result)))
      .catch(() => {
        dispatch(userFetchDataFailed());
      });
  }

  return (dispatch : any) => request(url)
    .then(result => dispatch(todosFetchDataSuccess(result)));
}

export function addInput(input: string) {
  return {
    type: 'ADD_Input',
    input,
  };
}

export function addSelect(select: string) {
  return {
    type: 'ADD_Select',
    select,
  };
}

export function chooseUserId(userId: number) {
  return {
    type: 'chooseUserId',
    userId,
  };
}

export function holdUser() {
  return {
    type: 'chooseUserId',
    userId: 0,
  };
}
