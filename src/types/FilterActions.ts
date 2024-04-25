export type SetAction = {
  type: 'SET_QUERY' | 'SET_STATUS';
  payload: string;
};

export type Action = SetAction;
