enum type {
  AUTHOR = 'author',
  TOPIC = 'topic',
  ORIGIN = 'origin',
  QUOTE = 'quote',
}

export interface Translation {
  _id?: string;
  type?: type.AUTHOR | type.ORIGIN | type.QUOTE | type.TOPIC;
  original?: string;
  spanish?: string;
}
