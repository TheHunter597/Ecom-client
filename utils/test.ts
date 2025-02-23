// lib/AuthenticationError.js
class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

export default AuthenticationError;
