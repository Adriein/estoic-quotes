require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import { quotes } from './routes/quotes';
import { auth } from './routes/auth';
import { subscribe } from './routes/subscribe';
import mongoose from 'mongoose';
import { errorHandler } from './routes/middlewares';
import chalk from 'chalk';
import cookieSession from 'cookie-session';
import path from 'path';

const init = async () => {
  console.log(chalk.blue('Starting up...'));
  try {
    await mongoose.connect(process.env.DATABASE_URL || '', {
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
  console.log(
    chalk.blue(`App Environment: PORT: ${app.get('port')} CONFIG: DEV `)
  );

  app.use(bodyParser.json());
  app.use(
    cookieSession({
      signed: false,
      secure: false,
      // maxAge: 900000,
      httpOnly: false,
    })
  );
  app.use('/api/auth', auth);
  app.use('/api/admin', quotes);
  app.use('/api', subscribe);
  app.use(errorHandler);

  if (process.env.NODE_ENV === 'pro') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(
        path.resolve(__dirname, '..', 'client', 'build', 'index.html')
      );
    });
  }

  app.listen(app.get('port'), () => {
    console.log(chalk.bgGreen.black.bold(`Server running...`));
  });
};

init();
