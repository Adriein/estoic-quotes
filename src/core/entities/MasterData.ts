import { Author } from './Author';
import { Topic } from './Topic';
import { Origin } from './Origin';

export interface MasterData {
  authors: Author[];
  topics: Topic[];
  origins: Origin[];
}
