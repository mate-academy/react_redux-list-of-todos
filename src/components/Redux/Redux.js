let state = null;
const callbacks = new Set();

export const todoStore = {
  getState() {
    return state;
  },
  setSelectedTodo(newTodo) {
    state = newTodo;
    callbacks.forEach(cb => cb());
  },
  subscribe(callback) {
    callbacks.add(callback);

    return () => {
      callbacks.delete(callback);
    };
  },
};
