export interface Repository<T> {
  fetch(id: string): Promise<T>;
  find(searchObj: any): Promise<T[]>;
  save(body: T): Promise<T>;
  put(id: string, body: T): Promise<T>;
  delete(id: string): Promise<number>;
}
