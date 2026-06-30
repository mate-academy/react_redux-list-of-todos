import classNames from 'classnames';
import './Loader.scss';

type Props = {
  loading: boolean;
};

export const Loader = ({ loading }: Props) => (
  <div
    className={classNames('Loader', { 'is-hidden': !loading })}
    data-cy="loader"
  >
    <div className="Loader__content" />
  </div>
);
