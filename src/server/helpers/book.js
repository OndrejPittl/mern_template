import Book from '../models/book';
import { findAuthors } from './author';

/**
 * Fetches books and its dependent entities (authors).
 * @param {*} bookIds array of ids of the books
 */
export const findBooks = async bookIds => {
  const books = await Book.find({ _id: { $in: bookIds } });
  return books.map(b => transformBook(b));
};

export const transformBook = async book => {
  return {
    ...book._doc,
    _id: book.id,
    authors: findAuthors.bind(this, book.authors)
  };
};
