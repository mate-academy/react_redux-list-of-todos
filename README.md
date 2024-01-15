# React + Redux list of TODOs

You are given an `app` folder with already implemented `store` and `hooks`.
Use them to implement [Dynamic list of TODOs](https://github.com/mate-academy/react_dynamic-list-of-todos#react-dynamic-list-of-todos)
using the Redux. It should look and work identically, so use the same markup.

> Here is [the working version](https://mate-academy.github.io/react_redux-list-of-todos/)

- `features/currentTodo` contains a sample of all the required types;
- implement `features/filter` storing `query` and `status`;
- implement `features/todos` storing an array of todos;
- load the todos in the `App` on page load (don't use Redux Thunk for now);
- `useAppSelector` already aware of `RootState` so you can write selectors in your
components (no need to write them in the store file)

## Instructions
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://yevhenkharko.github.io/react_redux-list-of-todos/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

The goal of this task is to teach you:

how to work with a not detailed task description;
to learn the existing code before you start;
to understand tests and why they fail;
to try the working page and implement the same behaviour;
Here is the working page

You are given the markup for the App, TodosList, TodoFilter, TodoModal and Loader components. Load data from the API and show it using the given components.

Load the todos when the App is loaded and show them using TodoList (check the code in the api.ts);
Show the Loader when waiting any data from the server (check the components folder);
Check how the wait function is used in the api.ts to ensure that Loader works as expected;
When the Show button is clicked open the TodoModal with a selected todo;
Don't forget to load user details (replace 1 with the actual userId);
Show the Loader while waiting for the user;
x button should close the modal;
The select should filter todos by the completed status: all, completed and active(not completed) todos;
Use the input in the TodoFilter to filter the todos by title;
show the x button when the query is entered;
the x button should clear the query and reset the todos;
