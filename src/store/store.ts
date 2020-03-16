import { createStore, applyMiddleware, Reducer, Dispatch } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { getTodos, getUsers } from '../api/DataFromServer';
// eslint-disable-next-line import/no-cycle
import {
  AppActions,
  DeleteTodoItemInterface,
  SetLoadingConditionActionInterface,
  SetPrepearedTodoListActionInterface,
  SetSortedTodoListInterface,
} from '../actionsType/actionsType';


const initialState = {
  loadingCondition: false,
  prepearedTodoList: [],
  sortedTodoList: [],
};

// Action
export const Actions = {
  SET_LOADING_CONDITION: 'SET_LOADING_CONDITION',
  SET_PREPEARED_TODO_LIST: 'SET_PREPEARED_TODO_LIST',
  DELETE_TODO_ITEM: 'DELETE_TODO_ITEM',
  SET_SORTED_TODO_LIST: 'SET_SORTED_TODO_LIST',
};


// ActionCreators
export const setPrepearedTodoListAction
  = (PreperedTdoList: TodoWithUser[]): SetPrepearedTodoListActionInterface => ({
    type: Actions.SET_PREPEARED_TODO_LIST,
    prepearedTodoList: PreperedTdoList,

});

export const setLoadingConditionAction = (): SetLoadingConditionActionInterface => ({
  type: Actions.SET_LOADING_CONDITION,
});

export const deleteTodoItem = (deletedItemId: number): DeleteTodoItemInterface => ({
  type: Actions.DELETE_TODO_ITEM,
  deletedItemId,
});

export const setSortedTodoList = (sortedTodoList: TodoWithUser[]): SetSortedTodoListInterface => ({
  type: Actions.SET_SORTED_TODO_LIST,
  sortedTodoList,
});

export const loadUsers = (): any => {
  return (dispatch: Dispatch) => {
    dispatch(setLoadingConditionAction());

    Promise.all([getUsers(), getTodos()])
      .then(([user, todo]) => {
        const todoWithUser = todo.map((todoItem: Todo) => (
          {
            ...todoItem,
            user: user.find((userItem: User) => userItem.id === todoItem.userId),
          }
        ));

        dispatch(setPrepearedTodoListAction(todoWithUser));
      });
  };
};


const reducer: Reducer = (
  state = initialState,
  action,
): InitialStateInterface => {
  switch (action.type) {
    case Actions.SET_LOADING_CONDITION:
      return {
        ...state,
        isLoading: true,
      };

    case Actions.SET_PREPEARED_TODO_LIST:
      return {
        ...state,
        isLoading: false,
        prepearedTodoList: action.prepearedTodoList,
        sortedTodoList: action.prepearedTodoList,
      };

    case Actions.DELETE_TODO_ITEM:
      return {
        ...state,
        prepearedTodoList: state.prepearedTodoList.filter((todo: Todo) => {
          return action.deletedItemId !== todo.id;
        }),
        sortedTodoList: state.prepearedTodoList.filter((todo: Todo) => {
          return action.deletedItemId !== todo.id;
        }),
      };

    case Actions.SET_SORTED_TODO_LIST:
      return {
        ...state,
        sortedTodoList: action.sortedTodoList,
        prepearedTodoList: action.sortedTodoList,
      };

    default:
      return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk as ThunkMiddleware<InitialStateInterface, AppActions>),
);

export default store;
