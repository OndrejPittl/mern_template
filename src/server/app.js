import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import graphqlSchema from './graphql/schemas/index';
import graphqlResolvers from './graphql/resolvers/index';
import isAuth from './middlewear/is-auth';

// import helmet from 'helmet';
// import session from 'express-session';
// import connectMongo from 'connect-mongo';
// import loggerConfig from './config/loggerConfig';

// const { NODE_ENV, SESSION_NAME, SESSION_SECRET, SESSION_MAX_AGE, , PORT } = process.env;
const { PORT, MONGO_DB_URI } = process.env;
const app = express();

// middlewear parsing incoming JSON
app.use(bodyParser.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true
  })
);

console.log(MONGO_DB_URI);

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    const port = PORT || 8080;
    app.listen({ port }, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => console.error(err));

/*
const port = PORT || 8080;
app.listen({ port }, () => {
  console.log(`Server running on port ${port}`);
});
*/

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// mongoose.set('useCreateIndex', true);

// secure HTTP headers
// app.use(helmet());
// app.use(helmet.permittedCrossDomainPolicies());

// Serve React Application
// if (NODE_ENV !== 'development') {
// app.use(express.static('dist'));
// }

// user session
/*
const MongoStore = connectMongo(session);
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: parseInt(SESSION_MAX_AGE, 10),
      sameSite: true,
      httpOnly: true,
      secure: !NODE_ENV.trim() === 'development'
    }
  })
);
*/

// ...

// Logging with Morgan
/*
if (NODE_ENV === 'development') {
  loggerConfig(app);
}
*/

/*
server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: 'http://localhost:3000'
  }
});
*/

/*
mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  const port = PORT || 8080;
  app.listen({ port }, () => {
    console.log(`Server running on port ${port}`);
  });
});
mongoose.connection.on('error', error => console.error(error));
*/
