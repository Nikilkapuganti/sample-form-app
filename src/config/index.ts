import { init as initDb } from './db';

const initDependencies = async () => {
  await initDb();
};

export { initDependencies };
