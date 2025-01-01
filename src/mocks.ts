import { CompletionQuery } from './types/CompletionQuery';

export const completionOptions = [
  { value: CompletionQuery.All, name: 'All' },
  { value: CompletionQuery.Active, name: 'Active' },
  { value: CompletionQuery.Completed, name: 'Completed' },
];
