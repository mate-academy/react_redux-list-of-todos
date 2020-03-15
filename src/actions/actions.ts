const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const SET_VALUE = 'SET_VALUE';

export interface IncrementInterface {
    type: typeof INCREMENT;
}

export interface DecrementInterface {
    type: typeof DECREMENT;
}

export interface SetValueInterface {
    type: typeof SET_VALUE;
    value: number;
}

export type ActionType = IncrementInterface| DecrementInterface| SetValueInterface;
export type AppActions = ActionType;
