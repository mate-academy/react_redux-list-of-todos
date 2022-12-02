import { Status } from '../types/Status';

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

    default:
      return state;
  }
};

export const actions = {
  status,
  query,
};

export default filterReducer;
