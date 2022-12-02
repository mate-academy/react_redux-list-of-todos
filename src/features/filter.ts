import { Status } from '../types/Status';
// import { Todo } from '../types/Todo';

// type SetQuery = {
//   type: 'query/SET',
//   payload: string
// };

// type ClearQuery = {
//   type: 'query/DELETE',
//   payload: string
// };

// или можно его дефолтным сделать и для ол не писать
// type SetAllStatus = {
//   type: 'statusAll/SET',
//   payload: Status
// };

// type SetActiveStatus = {
//   type: 'statusActive/SET',
//   payload: Status
// };

// type SetCompletedStatus = {
//   type: 'statusCompleted/SET',
//   payload: Status
// };

// type defaultStatus = {
//   type: 'statusCompleted/SET',
//   payload: Status
// };

// const setQuery = (value: string): SetQuery => ({
//   // type: Status,
//   type: 'query/SET',
//   payload: value,
// });

// const clearQuery = (): ClearQuery => ({
//   // type: Status,
//   type: 'query/DELETE',
//   payload: '',
// });

// const setAllStatus = (status: Status): SetAllStatus => ({
//   // type: Status,
//   type: 'statusAll/SET',
//   payload: status,
// });

// const setActiveStatus = (status: Status): SetActiveStatus => ({
//   // type: Status,
//   type: 'statusActive/SET',
//   payload: status,
// });

// const setCompletedStatus = (status: Status): SetCompletedStatus => ({
//   // type: Status,
//   type: 'statusCompleted/SET',
//   payload: status,
// });

type StatusType = {
  type: 'status/SET',
  payload: Status,
};

type QueryType = {
  type: 'query/SET',
  payload: string,
};

const status = (value: Status): StatusType => ({
  type: 'status/SET',
  payload: value,
});

const query = (value: string): QueryType => ({
  type: 'query/SET',
  payload: value,
});

// мне нужно сделать два обекта один для статуса а 2й для квери, если их не сделать и поставить в велью инпута
// то будет [Object object]  а не квери так как я поместил обект а не свойство квери
// эти кучи со статусами мне не нужны так как их проверку я буду делать в компоненте

type DefaultState = {
  query: string,
  status: Status,
};

type Actions = StatusType | QueryType;

const defaultState: DefaultState = {
  query: '',
  status: 'all',
};

//  фильтрацию наверное надо делать в фильтр компоненти так как я сюда не протощю квери
// надо результат работы фильтрации сюда тащить?
const filterReducer = (state = defaultState, action: Actions): DefaultState => {
  switch (action.type) {
    case 'query/SET':
      // query: action.payload мы постоянно переписывам квери и поэтому в нем не накопляються клики по селекту и его значения
      return { ...state, query: action.payload };

    case 'status/SET':
      return { ...state, status: action.payload };
    // case 'statusCompleted/SET':
    //   return action.payload.filter(item => {
    //     return !item.completed && filterBySearch(item.title, 'query');
    //   });
    default:
      return state;
  }
};

export const actions = {
  status,
  query,
};

// type Actions = SetAllStatus
// | SetActiveStatus
// | SetCompletedStatus
// | SetQuery
// | ClearQuery;

// const filterReducer = (state: DefaultState = defaultState, action: Actions) => {
//   switch (action.type) {
//     case 'query/SET':
//       return { ...state, query: action.payload };

//     case 'query/DELETE':
//       return { ...state, query: action.payload };
//     // case 'statusCompleted/SET':
//     //   return action.payload.filter(item => {
//     //     return !item.completed && filterBySearch(item.title, 'query');
//     //   });
//     default:
//       return state;
//   }
// };

// export const actions = {
//   setAllStatus,
//   setActiveStatus,
//   setCompletedStatus,
//   setQuery,
//   clearQuery,
// };
export default filterReducer;
