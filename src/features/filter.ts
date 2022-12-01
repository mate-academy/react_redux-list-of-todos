import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

// тест для функции
// const filterBySearch = (todoTitle: string, queryText: string) => {
//   return todoTitle.toLowerCase().includes(queryText);
// };

// или можно его дефолтным сделать и для ол не писать
type SetAllStatus = {
  type: 'statusAll/SET',
  payload: Status
};

type SetActiveStatus = {
  type: 'statusActive/SET',
  payload: Status
};

type SetCompletedStatus = {
  type: 'statusCompleted/SET',
  payload: Status
};

const setActiveStatus = (status: Status): SetActiveStatus => ({
  // type: Status,
  type: 'statusActive/SET',
  payload: status,
});

const setCompletedStatus = (status: Status): SetCompletedStatus => ({
  // type: Status,
  type: 'statusCompleted/SET',
  payload: status,
});

type Actions = SetAllStatus | SetActiveStatus | SetCompletedStatus;
// const defaultState =
//  фильтрацию наверное надо делать в фильтр компоненти так как я сюда не протощю квери
// надо результат работы фильтрации сюда тащить?
const filterReducer = (state: Todo[] = [], action: Actions) => {
  switch (action.type) {
    // case 'statusActive/SET':
    //   // return action.payload.filter(item => {
    //   //   // придумай как сюда запрос из строки поиска поставить
    //   //   return item.completed && filterBySearch(item.title, 'query');
    //   // });
    //   return {...state, action.payload.filter(item => {
    //     // придумай как сюда запрос из строки поиска поставить
    //     return item.completed && filterBySearch(item.title, 'query');
    //   })}
    // case 'statusCompleted/SET':
    //   return action.payload.filter(item => {
    //     return !item.completed && filterBySearch(item.title, 'query');
    //   });
    default:
      // return state && filterBySearch(item.title, query);
      return state;
  }
  // return {
  //   query: '',
  //   status: 'all',
  // };
};

export const actions = { setActiveStatus, setCompletedStatus };
export default filterReducer;
