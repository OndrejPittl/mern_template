import authorResolver from './author';
import bookResolver from './book';
import userResolver from './user';

const resolvers = {
  ...authorResolver,
  ...bookResolver,
  ...userResolver
};

export default resolvers;
