// import { applyMiddleware, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

// import thunk from 'redux-thunk';

type Action = {
  type: 'START_LOADING' | 'FINISH_LOADING';
};

export type LoadingType = {
  loading: boolean;
};

export const loadingState: LoadingType = {
  loading: false,
};

const loadingReducer = (state = loadingState, action: Action) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'FINISH_LOADING':
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export const actions = {
  // the function return type gatantees that we can't mistype
  startLoading: () => ({
    type: 'START_LOADING',
  }),

  finishLoading: () => ({
    type: 'FINISH_LOADING',
    // the function return type forces us to add the `payload` property with a string
  }),
};

export const selectorsLoading = {
  isLoading: (state: LoadingType) => state.loading,
};

export default loadingReducer;

// export const LoadingStore = createStore(
//   loadingReducer,
//   composeWithDevTools( // allows you to use https://github.com/reduxjs/redux-devtools/tree/main/extension#redux-devtools-extension
//     applyMiddleware(thunk),
//   ),
// );
