import Author from '../../models/author';
import { transformAuthor } from '../../helpers/author';

const resolver = {

  /**
   * Gets all authors.
   */
  authors: async () => {
    try {
      const authors = await Author.find();
      return authors.map(a => transformAuthor(a));
    } catch (err) {
      throw err;
    }
  },

  /**
   * Creates new author.
   * @param {*} args
   */
  createAuthor: async args => {
    const { name, birthdate } = args.input;
    try {
      const existingAuthor = await Author.findOne({ name });
      if (existingAuthor) {
        throw new Error('Author exists already.');
      }
      const author = new Author({ name, birthdate });
      const result = await author.save();
      return transformAuthor(result);
    } catch (err) {
      throw err;
    }
  }
};

export default resolver;
