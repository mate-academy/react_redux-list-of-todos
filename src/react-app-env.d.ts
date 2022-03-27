// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Todo {
  'id': number,
  'createdAt': string;
  'updatedAt': string;
  'userId': number;
  'title': string;
  'completed': boolean;
}

interface User {
  'id': number;
  'name': string;
  'phone': string;
  'website': string;
}
