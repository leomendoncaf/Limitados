export type Result<T, E> = Ok<T> | Err<E>;

export class Ok<T> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  isError(): this is Err<T> {
    return false;
  }

  isOk(): this is Ok<T> {
    return true;
  }
}

export class Err<T> {
  readonly err: T;

  constructor(err: T) {
    this.err = err;
  }

  isError(): this is Err<T> {
    return true;
  }

  isOk(): this is Ok<T> {
    return false;
  }
}

export class Unit {}

export const unit = new Unit();
