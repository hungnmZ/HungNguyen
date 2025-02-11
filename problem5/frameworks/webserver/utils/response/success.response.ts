import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

interface ISuccessResponse {
  send(res: Response, headers: object): Response;
}

interface IResponse {
  message?: ReasonPhrases | string;
  data?: object;
  headers?: object;
  res?: Response;
}

class SuccessResponse implements ISuccessResponse {
  private message: string;
  private status: number;
  private data: object;
  constructor({
    message = ReasonPhrases.OK,
    status = StatusCodes.OK,
    data = {},
  }: IResponse & { status?: number }) {
    this.message = message || ReasonPhrases.OK;
    this.status = status;
    this.data = data;
  }

  send(res: Response, headers: object) {
    return res.status(this.status).set(headers).json(this);
  }
}

class Ok extends SuccessResponse {
  constructor({ message, data = {} }: IResponse) {
    super({ message, data });
  }
}

class create extends SuccessResponse {
  constructor({ message, data = {} }: IResponse) {
    super({ message, data, status: StatusCodes.CREATED });
  }
}

const CREATED = ({
  res,
  message = ReasonPhrases.CREATED,
  data,
  headers = {},
}: IResponse) => {
  new create({
    message,
    data,
  }).send(res, headers);
};

const OK = ({ res, message = ReasonPhrases.OK, data, headers = {} }: IResponse) => {
  new Ok({
    message,
    data,
  }).send(res, headers);
};

export { CREATED, OK };
