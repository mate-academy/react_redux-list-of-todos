import React from 'react';
import { Button } from 'semantic-ui-react';
import { ForButtonsContext } from '../context';

function Buttons() {
  return (
    <ForButtonsContext.Consumer>
      {value => (
        <>
          <Button
            type="button"
            onClick={() => value.switcher('byTitle')}
          >
            By User!
          </Button>
          <Button
            type="button"
            onClick={() => value.switcher('byUser')}
          >
            By Title!
          </Button>
          <Button
            type="button"
            onClick={() => value.switcher('byStatus')}
          >
            By Status!
          </Button>
          <Button
            type="button"
            onClick={() => value.refresher()}
          >
            Refresh!
          </Button>
        </>
      )}
    </ForButtonsContext.Consumer>
  );
}

export default Buttons;
