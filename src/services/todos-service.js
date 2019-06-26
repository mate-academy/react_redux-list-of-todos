export default class TodosService {
  constructor() {
    this.apiBase = 'https://jsonplaceholder.typicode.com/';
  }

  getUsers() {
    return this._getData('users');
  }

  getTodos() {
    return this._getData('todos');
  }

  _getData(type) {
    return fetch(`${this.apiBase}${type}`)
      .then(res => res.json());
  }
}
