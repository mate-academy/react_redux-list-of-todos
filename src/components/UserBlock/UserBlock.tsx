import { User } from '../../types/User';

type Props = {
  isCompleted: boolean;
  user: User;
};

export const UserBlock: React.FC<Props> = ({ isCompleted, user }) => {
  const { email, name } = user;

  return (
    <p className="block" data-cy="modal-user">
      {isCompleted ? (
        <strong className="has-text-success">Done</strong>
      ) : (
        <strong className="has-text-danger">Planned</strong>
      )}
      {' by '}
      <a href={`mailto:${email}`}>{name}</a>
    </p>
  );
};
