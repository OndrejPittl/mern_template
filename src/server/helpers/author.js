import Author from '../models/author';
import { findBooks } from './book';
import { dateToString } from '../utils/date';

/**
 * Fetches authors and its dependent entities (books).
 * @param {ObjectId} authorIds array of ids of the authors
 */
export const findAuthors = async authorIds => {
  const authors = await Author.find({ _id: { $in: authorIds } });
  return authors.map(a => transformAuthor(a));
};

export const transformAuthor = async author => {
  return {
    ...author._doc,
    _id: author.id,
    birthdate: dateToString(author.birthdate),
    books: findBooks.bind(this, author.books)
  };
};
