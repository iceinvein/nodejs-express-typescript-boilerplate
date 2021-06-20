import { createHttpTerminator } from 'http-terminator';
import app from './app';
import logger from './logger';
import { PORT } from './config';
import connectDatabase from './database';

connectDatabase();

const server = app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT} in ${app.get('env')} mode`);
});

process.on('unhandledRejection', (err: Error) => {
  throw err;
});

process.on('uncaughtException', (err: Error) => {
  logger.error(err.stack);
  process.exitCode = 1;
  process.kill(process.pid, 'SIGTERM');
});

const httpTerminator = createHttpTerminator({ server });
const shutdownSignals = ['SIGTERM', 'SIGINT'];

shutdownSignals.forEach((signal) => {
  process.on(signal, async () => {
    logger.info(`${signal} received, shutting down gracefully...`);
    await httpTerminator.terminate();
  });
});

export default server;
