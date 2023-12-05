import { createRoot } from 'react-dom/client';

import { App } from './App';
import { TodoProvider } from './TodoContext';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <TodoProvider>
    <App />
  </TodoProvider>,
);
