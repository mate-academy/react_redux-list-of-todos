# React dynamic list of TODOs

## Demo link

Add link here: `[DEMO LINK](https://vmishchenko.github.io/react_redux-list-of-todos/)`


## Task

By requesting [https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos) and [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users), create and display a list of TODO items.

Create `TodoList` (for the whole list), `TodoItem` (for a single TODO item), and `User` (for displaying information about a user). `TodoList` should display a list of `TodoItem`s; each `TodoItem` must display the basic info about an item as well as the `User` the item belongs to. You can choose yourself what exact information you want to present and how, but you need to show at least the title of the item, the name of the user and whether the item is completed.

Initially `TodoList` shows a "Load" button. On click disable the button, change its text to "Loading..." and download the data. Once the data has been loaded, hide the button altogether and display the TODO items instead.

Additionally, you should provide a capability of sorting the items either by title, user or its status (whether the item is completed or not).

## Workflow

- Fork the repository with task
- Clone forked repository
    ```bash
    git clone git@github.com:<user_name>/<task_repository>.git
    ```
- Run `npm install` to install dependencies.
- Then develop

## Development mode

- Run `npm start` to start development server on `http://localhost:3000`
    When you run server the command line window will no longer be available for
    writing commands until you stop server (`ctrl + c`). All other commands you
    need to run in new command line window.
- Follow [HTML, CSS styleguide](https://mate-academy.github.io/style-guides/htmlcss.html)
- Follow [the simplified JS styleguide](https://mate-academy.github.io/style-guides/javascript-standard-modified)
- run `npm run lint` to check code style
- When you finished add correct `homepage` to `package.json` and run `npm run deploy`
- Add links to your demo in readme.md.
  - `[DEMO LINK](https://<your_account>.github.io/<repo_name>/)` - this will be a
  link to your index.html
- Commit and push all recent changes.
- Create `Pull Request` from forked repo `(<branch_name>)` to original repo
(`master`).
- Add a link at `PR` to Google Spreadsheets.

## Project structure

- `src/` - directory for css, js, image, fonts files
- `build/` - directory for built pages

You should be writing code in `src/` directory.
