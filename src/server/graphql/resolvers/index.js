import authorResolver from './author';
import bookResolver from './book';

const resolvers = {
  ...authorResolver,
  ...bookResolver
};

export default resolvers;
