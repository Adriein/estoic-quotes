export interface Quote {
  _id?: string;
  author?: string;
  topic?: string;
  quote?: string;
  origin?: string;
  translations?: Quote[];
  creationDate?: Date;
}
