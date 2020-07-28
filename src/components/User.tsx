import React from 'react';
import { UserProps } from './types';

export const User: React.FC<UserProps> = ({ name }) => (
  <td>{name}</td>
);
