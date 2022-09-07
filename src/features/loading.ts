type SetPageIsLoading = {
  type: 'loading/Page/SETTRUE'
};

type SetPageIsNOTLoading = {
  type: 'loading/Page/SETFALSE'
};

type SetModalIsLoading = {
  type: 'loading/Modal/SETTRUE'
};

type SetModalIsNOTLoading = {
  type: 'loading/Modal/SETFALSE'
};

const setModalIsLoading = (): SetModalIsLoading => ({
  type: 'loading/Modal/SETTRUE',
});

const setModalIsNOTLoading = (): SetModalIsNOTLoading => ({
  type: 'loading/Modal/SETFALSE',
});

const setPageIsLoading = (): SetPageIsLoading => ({
  type: 'loading/Page/SETTRUE',
});

const setPageIsNOTLoading = (): SetPageIsNOTLoading => ({
  type: 'loading/Page/SETFALSE',
});

export const actions = {
  setModalIsLoading,
  setModalIsNOTLoading,
  setPageIsLoading,
  setPageIsNOTLoading,
};

export const getModalLoading = (loading: State) => {
  return loading.modalLoading;
};

export const getPageLoading = (loading: State) => {
  return loading.pageLoading;
};

type State = {
  pageLoading: boolean,
  modalLoading: boolean,
};

type Action = SetModalIsLoading | SetModalIsNOTLoading
| SetPageIsLoading | SetPageIsNOTLoading;

const loadingReducer = (
  loading: State = { pageLoading: true, modalLoading: true },
  action: Action,
): State => {
  switch (action.type) {
    case 'loading/Modal/SETTRUE':
      return {
        ...loading,
        modalLoading: true,
      };

    case 'loading/Modal/SETFALSE':
      return {
        ...loading,
        modalLoading: false,
      };

    case 'loading/Page/SETTRUE':
      return {
        ...loading,
        pageLoading: true,
      };

    case 'loading/Page/SETFALSE':
      return {
        ...loading,
        pageLoading: false,
      };

    default:
      return loading;
  }
};

export default loadingReducer;
