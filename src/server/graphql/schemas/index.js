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
  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String!
    password: String
  }
  input UserInput {
    firstName: String
    lastName: String
    email: String!
    password: String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  type RootQuery {
    authors: [Author!]!
    books: [Book!]!
    users: [User!]!
    login(email: String!, password: String!): AuthData!
  }
  type RootMutation {
    createBook(input: BookInput!): Book!
    createAuthor(input: AuthorInput!): Author!
    createUser(input: UserInput!): User!
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

export default schema;
