export interface Repository<T> {
  //   fetch(): T;
  find(): Promise<T[]>;
  //   create(): T;
  //   put(): T;
  //   delete(): T;
}
