import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (error, _req, res, _next) => {
  console.log(error);
  return res.status(500).json({ error: error.message });
};

export default errorMiddleware;
