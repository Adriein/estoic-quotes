import express from 'express';
import bodyParser from 'body-parser';
import { quotes } from './routes/quotes';
import { auth } from './routes/auth';
import mongoose from 'mongoose';
import { errorHandler } from './routes/middlewares';
import chalk from 'chalk';

const init = async () => {
  console.log(chalk.blue('Starting up...'));
  const DATABASE_URL: string = 'mongodb://127.0.0.1:27017/test';
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(chalk.green('Conected to MongoDB'));
  } catch (err) {
    console.error(err);
  }

  const app = express();

  app.set('port', process.env.PORT || 5000);
  console.log(chalk.blue(`App Environment: PORT: ${app.get('port')} CONFIG: DEV `));

  app.use(bodyParser.json());

  app.use('/api/auth', auth);
  app.use('/api/admin', quotes);
  app.use(errorHandler);

  app.listen(app.get('port'), () => {
    console.log(chalk.bgGreen.black.bold(`Server running...`));
  });
};

init();
