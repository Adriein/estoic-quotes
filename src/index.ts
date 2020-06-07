// import mongoose, { Schema } from 'mongoose';

// mongoose.connect('mongodb://127.0.0.1:27017/test');

// mongoose.connection.on('open', (_) => console.log('Connection!'));

// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//   },
//   { timestamps: true },
// );

// const User = mongoose.model('User', userSchema);

// const user = new User({username: 'Adria'});

// user.save();

import express from 'express';
import bodyParser from 'body-parser';
import { quotesRouter } from './routes/quotesRouter';

const init = async () => {
  // const database = await new MongoDs().connect();
  // console.log('Connected to DB');

  const app = express();

  app.set('port', process.env.PORT || 5000);
  console.log(`App Environment: PORT: ${app.get('port')} CONFIG: DEV `);

  app.use(bodyParser.json());

  app.use('/api/admin', quotesRouter);

  app.listen(app.get('port'), () => {
    console.log(`Server running...`);
  });
};

init();
