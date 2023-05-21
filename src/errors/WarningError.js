export class WarningError extends Error {
  constructor(message) {
    super(message);
    this.name = "WarningError";
  }
}
