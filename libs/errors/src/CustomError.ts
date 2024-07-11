export abstract class CustomError<T> extends Error {
  public abstract name: string;
  public data: T;

  constructor(data: T) {
    super();

    this.data = data;
  }

  get message() {
    return this.toString();
  }

  abstract toString(): string;
}
