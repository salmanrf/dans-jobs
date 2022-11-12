import { UserJwtPayload } from 'src/auth/model/user-decoded.model';

export interface CustomRequest extends Partial<Request> {
  user: UserJwtPayload;
}
