# React dynamic list of TODOs
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://<your_account>.github.io/react_dynamic-list-of-todos/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## Description
Basing on [Static list of TODOs](https://github.com/mate-academy/react_static-list-of-todos)
create the App downloading the [TODOs](https://jsonplaceholder.typicode.com/todos)
and [Users](https://jsonplaceholder.typicode.com/users) from API (follow the links).

1. Initially the user sees a `Load` button.
1. After a click disable the button, change its text to `Loading...` and download the data.
1. Once the data has been loaded, hide the button and display the list of TODOs instead.
1. Additionally, you should provide a capability of sorting the TODOs by:
    - `todo.title`
    - `todo.completed` (whether the item is completed or not)
    - `user.name`
1. There should not be extra requests to the server except the first one
