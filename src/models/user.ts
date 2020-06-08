import type { IStravaAthlete } from '~/types';
import {
  CacheKey,
  setJSONToLocalStorage,
  getJSONFromLocalStorage,
  removeFromLocalStorage,
} from '~/utils/localStorage';

export default class User {
  public static getFromCache(): User | undefined {
    const result = getJSONFromLocalStorage(CacheKey.User);
    if (!result) {
      return undefined;
    }

    return new User(result);
  }

  public static saveToCache(user: User) {
    setJSONToLocalStorage(CacheKey.User, user);
  }

  public static clearCache() {
    removeFromLocalStorage(CacheKey.User);
  }

  firstName: string;

  lastName: string;

  constructor(data: IStravaAthlete) {
    this.firstName = data.firstname;
    this.lastName = data.lastname;
  }

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
