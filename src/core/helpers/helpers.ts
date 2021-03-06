import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { Subscriber } from '../entities';

const scryptAsync = promisify(scrypt);

export const isEmpty = (obj: Object) => {
  return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
};

export const toHash = async (password: string) => {
  const salt = randomBytes(8).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;

  return `${buf.toString('hex')}-${salt}`;
};

export const compare = async (
  storedPassword: string,
  suppliedPassword: string
) => {
  const [hashedPassword, salt] = storedPassword.split('-');
  const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

  return buf.toString('hex') === hashedPassword;
};

export const maskFields = (object: any, array: string[]): Object => {
  Object.keys(object).forEach((key) => {
    array.forEach((element) => {
      if (element === key) {
        delete object[key];
      }
    });
  });
  return object;
};

export const validateQuote = (input: {
  topic: string;
  author: string;
  translatedAuthor: string;
  origin: string;
  translatedOrigin: string;
  quote: string;
  translatedQuote: string;
}): boolean => {
  const {
    topic,
    author,
    translatedAuthor,
    origin,
    translatedOrigin,
    quote,
    translatedQuote,
  } = input;
  if (
    topic === '' ||
    author === '' ||
    translatedAuthor === '' ||
    origin === '' ||
    translatedOrigin === '' ||
    quote === '' ||
    translatedQuote === ''
  )
    return false;

  return true;
};

export const validateSubscriber = (subscriber: Subscriber): boolean => {
  if (subscriber.email === undefined || subscriber.email === '') return false;

  return true;
};
