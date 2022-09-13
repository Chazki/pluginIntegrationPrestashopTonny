import { Response } from 'express'

export const response = (message: unknown, res: Response, status: number): void => {
  res.status(status).send(message)
}
