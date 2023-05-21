export class InvalidParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidParameterError";
  }
}
