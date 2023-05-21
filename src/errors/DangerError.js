export class DangerError extends Error {
  constructor(message) {
    super(message);
    this.name = "DangerError";
  }
}
