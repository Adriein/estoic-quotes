export class Result<T> {
  constructor(private _data: T[] | number) {}

  get data(): T[] | number {
    return this._data;
  }
}
