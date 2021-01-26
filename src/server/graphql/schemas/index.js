import { buildSchema } from 'graphql';

const schema = buildSchema(`
  enum Genre {
    ACTION
    BIOGRAPHY
    CHILDREN
    DRAMA
    ENCYCLOPEDIA
    FANTASY
    HISTORY
    HORROR
    MYSTERY
    POETRY
    THRILLER
  }
  type Book {
    _id: ID!
    title: String!
    rating: Float!
    genre: [Genre!]!
    authors: [Author!]!
  }
  input BookInput {
    title: String!
    rating: Float
    genre: [Genre!]!
  }
  type Author {
    _id: ID!
    name: String!
    birthdate: String
    books: [Book!]
  }
  input AuthorInput {
    name: String!
    birthdate: String
  }
  type RootQuery {
    authors: [Author!]!
    books: [Book!]!
  }
  type RootMutation {
    createBook(input: BookInput!): Book!
    createAuthor(input: AuthorInput!): Author!
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

export default schema;
