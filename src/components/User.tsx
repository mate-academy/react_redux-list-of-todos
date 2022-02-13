/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { fetchUser } from '../api/user';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

export const User: React.FC = () => {
  const { userId }: State = useTypedSelector(state => state);
  const [user, setUser] = useState<User | null>(null);
  const { setUserIdAction } = useActions();

  useEffect(() => {
    (async function fetchData() {
      const currentUser = await fetchUser(userId);

      setUser(currentUser);
    }());
  }, [userId]);

  if (!user) {
    return <div>no user</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <article>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </article>
      <button
        type="button"
        onClick={() => setUserIdAction(0)}
      >
        Clear
      </button>
    </div>
  );
};
