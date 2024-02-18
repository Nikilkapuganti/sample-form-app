import express from 'express'
import bodyParser from 'body-parser'
import http from 'http';
import routes from './services';
import middleware from './middleware';
import { applyMiddleware, applyRoutes } from './utils';
import dotenv from 'dotenv';
import { initDependencies } from './config';

const app = express();
 dotenv.config();

const server = http.createServer(app);
const { PORT } = process.env;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
applyMiddleware(middleware, app);
applyRoutes(routes,app);





async function start() {
  await initDependencies();
  server.listen(PORT, () =>
    console.log(
      `Server is running @ http://localhost:${PORT}...`,
    )
  );
}
start();