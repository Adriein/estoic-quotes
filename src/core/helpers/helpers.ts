export const isEmpty = (obj: Object) => {
  return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
};
