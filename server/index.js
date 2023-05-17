import express from 'express';
const path = require('path');
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/combinedTypes';
import resolvers from './graphql/combinedResolvers';
import models from './models';
import CapitalizeDirective, { FormattableDateDirective } from './graphql/directives';

const port = 4000;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    capitalize: CapitalizeDirective,
    date: FormattableDateDirective,
  },
  formatError: (error) => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      // ...error, // uncomment this if you want to receive internal errors
      message,
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    }
    return {
      // authScope: await getUser(req.headers.authorization),
      models,
    };
  },
  subscriptions: {
    onConnect: () => console.log('Connected to websocket....../n'),
  },
  tracing: false,
});


const app = express();

app.use(express.static(path.join(__dirname, '../images')));
app.use('/images', express.static(path.join(__dirname, '../images')));
// app.use('/images', express.static(__dirname + "/images"));

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true }));

server.applyMiddleware({ app });


const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

models.sequelize.authenticate();
models.sequelize.sync();
// models.sequelize.sync({ force: true });

httpServer.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`);
});
