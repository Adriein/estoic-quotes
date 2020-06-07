import mongoose from 'mongoose';
import { Quote } from '../../core/entities/Quote';

export class MongoDs {
  private DATABASE_URL: string = 'mongodb://127.0.0.1:27017/test';

  async connect() {
    return mongoose.connect(this.DATABASE_URL);
  }

  createModel(name: string, schema: mongoose.Schema) {
    return mongoose.model(name, schema);
  }

  findAllQuotes(): Quote[] {
    throw new Error();
  }
}
