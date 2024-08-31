export enum HTTP {
  CREATE = 201,
  BAD = 400,
  UPDATE = 202,
  DELETE = 204,
  OK = 200,
}

interface iError {
  name: string;
  message: string;
  success: boolean;
  status: HTTP;
}

export class mainError extends Error {
  public readonly name: string;
  public readonly message: string;
  public readonly success: boolean = false;
  public readonly status: HTTP;

  constructor(args: iError) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name;
    this.message = args.message;
    this.status = args.status;

    if (this.success !== undefined) {
      this.success = args.success;
    }

    Error.captureStackTrace(this);
  }
}
