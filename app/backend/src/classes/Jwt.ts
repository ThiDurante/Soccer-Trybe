import * as jwt from 'jsonwebtoken';
import config from '../config/config';

interface JwtPayload {
  id: number
  username: string
  role: string
  email: string
  password: string
}

export default class Jwt {
  private readonly secret = config.secret;

  public generate(user: JwtPayload): string {
    const options: jwt.SignOptions = { expiresIn: '1d', algorithm: 'HS256' };
    return jwt.sign(user, this.secret, options);
  }

  public verify(token: string): JwtPayload {
    return jwt.verify(token, this.secret) as JwtPayload;
  }
}
