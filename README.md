# React + Redux list of TODOs
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://rostyslav-meleshko.github.io/react_redux-list-of-todos/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## Description
- Use Redux to implement all the functionality of [Dynamic list of TODOs](https://github.com/mate-academy/react_dynamic-list-of-todos#description) including sorting.
- Additionally add a button next to each item to remove the item.

.........................................................................
You are given a basic markup for the App, TodosList and CurrentUser components and the API.

Add the data loading, so the App works as described below:

Create a separate file api.js to put all the API call there.
Todos are fetched on page load from GET todos endpoint. (Use componentDidMount)
Each todo has a button to select a user but selectedUserId is stored in the App. (pass a callback to the TodoList)
CurrentUser component receives userId as a prop and loads user details from GET user endpoint (replace 1 with a given userId).
If I select another user the details should be updated. (use componentDidUpdate).
If I select the same user there should not be a request to the server.
Add a button Clear into the CurrentUser to clear the selectedUser in the App
Add an <input> to the TodoList to filter the todos by title
Add a <select> to the TodoList to show all, active(not completed) or completed todos.
(*) Add Randomize button to the TodoList to show the todos in a random order.