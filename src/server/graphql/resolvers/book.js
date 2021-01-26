import Author from '../../models/author';
import Book from '../../models/book';
import { transformBook } from '../../helpers/book';

const resolver = {

  /**
   * Gets all books.
   */
  books: async () => {
    try {
      const books = await Book.find();
      return books.map(b => transformBook(b));
    } catch (err) {
      throw err;
    }
  },

  /**
   * Creates a book.
   */
  createBook: async args => {
    const { title, rating, genre } = args.input;
    const book = new Book({
      title,
      rating: +rating || 0,
      genre,
      authors: ['5fbaebb37b1008e597e82d3e']
    });
    let createdBook;

    try {
      const result = await book.save();
      createdBook = transformBook(result);
      const author = await Author.findById('5fbaebb37b1008e597e82d3e');

      if (!author) {
        throw new Error('Author not found.');
      }

      author.books.push(book);
      await author.save();
      return createdBook;

    } catch (err) {
      console.error(err);
      throw err;
    }
  },

};

export default resolver;
