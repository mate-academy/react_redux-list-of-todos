import React from 'react';
import { TodosServiceConsumer } from '../todos-service-context';

const WithTodosService = () => (Wrapped) => {
  return (props) => {
    return (
      <TodosServiceConsumer>
        {
          (todosService) => {
            return (
              <Wrapped
                {...props}
                todosService={todosService}
              />);
          }
        }
      </TodosServiceConsumer>);
  }
};

export default WithTodosService;
