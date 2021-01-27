// import User from '../models/user';
import { findBooks } from './book';

export const transformUser = async user => {
  return {
    ...user._doc,
    _id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: null,
    reservations: findBooks.bind(this, user.reservations)
  };
};
