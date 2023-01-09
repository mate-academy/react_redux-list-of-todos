import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => (
  <div className="section">
    <div className="container">
      <div className="box">
        <div
          className="
            container
            box
            notification
            is-danger
            is-light"
        >
          Oh, no! Page is not found...
        </div>

        <span className="not-found-page__image" />
      </div>
    </div>
  </div>
);
