import React from 'react';

const {
  Provider: TodosServiceProvider,
  Consumer: TodosServiceConsumer
} = React.createContext();

export {
  TodosServiceProvider,
  TodosServiceConsumer
};
