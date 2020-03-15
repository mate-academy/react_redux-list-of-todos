import { createStore, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { getTodos, getUsers } from '../api/DataFromServer';
// eslint-disable-next-line import/no-cycle
import {
  AppActions,
  deleteTodoItemInterface,
  setLoadingConditionActionInterface,
  setPrepearedTodoListActionInterface,
  setSortedTodoListInterface,
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
export const setPrepearedTodoListAction = (PreperedTdoList: TodoWithUser[]): setPrepearedTodoListActionInterface => ({
  type: Actions.SET_PREPEARED_TODO_LIST,
  prepearedTodoList: PreperedTdoList,

});

export const setLoadingConditionAction = (): setLoadingConditionActionInterface => ({
  type: Actions.SET_LOADING_CONDITION,
});

export const deleteTodoItem = (deletedItemId: number): deleteTodoItemInterface => ({
  type: Actions.DELETE_TODO_ITEM,
  deletedItemId,
});

export const setSortedTodoList = (sortedTodoList: TodoWithUser[]): setSortedTodoListInterface => ({
  type: Actions.SET_SORTED_TODO_LIST,
  sortedTodoList,
});

export const loadUsers = () => {
  return (dispatch: any) => {
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


const reducer = (state: InitialStateInterface = initialState, action: any): InitialStateInterface => {
  switch (action.type) {
    case Actions.SET_LOADING_CONDITION:
      return {
        ...state,
        loadingCondition: true,
      };

    case Actions.SET_PREPEARED_TODO_LIST:
      return {
        ...state,
        loadingCondition: false,
        prepearedTodoList: action.prepearedTodoList,
        sortedTodoList: action.prepearedTodoList,
      };

    case Actions.DELETE_TODO_ITEM:
      return {
        ...state,
        prepearedTodoList: state.prepearedTodoList.filter(todo => {
          return action.deletedItemId !== todo.id;
        }),
        sortedTodoList: state.prepearedTodoList.filter(todo => {
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
