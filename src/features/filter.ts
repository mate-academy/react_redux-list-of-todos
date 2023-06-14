export enum Status {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export enum StatusAction {
  ALL = 'filter/StatusAll',
  ACTIVE = 'filter/Status/Active',
  COMPLETED = 'filter/StatusCompleted',
}

type StatusActionType = {
  type: StatusAction,
  payload: Status,
};

const setStatus = (
  type: StatusAction,
  status: Status,
): StatusActionType => ({
  type,
  payload: status,
});

export const actions = {
  setStatus,
};

const filterReducer = (
) => {
  return {
    query: '',
    status: 'all',
  };
};

// const filterReducer = (
//   state: State,
//   action: Action,
// ): State => {
//   return {
//     query: '',
//     status: 'all',
//   };
// };

export default filterReducer;
