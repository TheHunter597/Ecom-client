export default class NotAuthenticatedError extends Error {
  type: string = "login";
  constructor(message: string) {
    super(message);
    this.type = "login";
    this.name = "NotAuthenticatedError";
  }
}
