import { User } from '../types/User';
import { getData } from '../utils/httpClients';

export function getUser(userId: number) {
  return getData<User[]>('/users').then(users =>
    users.find(user => user.id === userId),
  );
}
