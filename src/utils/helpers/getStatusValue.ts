import { TodoStatusTypes } from '../../types/enums/TodoStatusTypes';

export function getStatusValue(key: keyof typeof TodoStatusTypes): string {
  return TodoStatusTypes[key];
}
