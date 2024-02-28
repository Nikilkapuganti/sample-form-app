import { GraphQLServer, PubSub } from 'graphql-yoga';
import mongoose from 'mongoose';
import { schema } from './interfaces/graphql';


const PORT = process.env.PORT || 3000;

const pubsub = new PubSub();

const server = new GraphQLServer({
  schema,
  context: { pubsub },
});

mongoose.connect('mongodb://localhost:27017/your_database_name');

server.start({ port: PORT }, () => {
  console.log(`Server is running on port ${PORT}`);
});
