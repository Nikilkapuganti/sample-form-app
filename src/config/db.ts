import * as mongo from 'mongodb';
import mongoose from 'mongoose';


let mongoDbClient = mongo.MongoClient;
let connectionObj: any;


const handle = (promise: any) => {
  return promise
    .then((data: mongo.MongoClient) => ([data, undefined]))
    .catch((error: any) => Promise.resolve([undefined, error]));
};

const init = async () => {
  console.log('Connecting to DB');
  let [connection, connectionErr] = await handle(
    mongoose.connect(`mongodb://localhost:27017/taskdb`)
  );

  if (connectionErr) {
    console.log("Error:", connectionErr);
    console.log(`Could not connect to MongoDB`);
  } else {
    connectionObj = connection;
    console.log(`MongoDB Client Connected`);
  }
};

export { init, connectionObj };
