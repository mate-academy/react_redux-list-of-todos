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


реализовать функции/фильтры, сохраняющие запрос и статус;
реализовать функции/задачи, хранящие массив задач;
загружать задачи в приложение при загрузке страницы (пока не используйте Redux Thunk);
useAppSelector уже знает о RootState, поэтому вы можете писать селекторы в своих компонентах (нет необходимости писать их в файле магазина)
инструкции

## Instructions
- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://voronine.github.io/react_redux-list-of-todos/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)
