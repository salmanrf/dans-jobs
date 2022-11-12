import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { jwt_sign } from 'src/common/utils/jwt-utils';
import { promise_tuplify } from 'src/common/utils/promise-utils';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserJwtPayload } from './model/user-decoded.model';

@Injectable()
export class AuthService {
  constructor(private readonly users_service: UsersService) {}

  async signup(dto: SignupDto) {
    try {
      const new_user = await this.users_service.create(dto);

      return new_user;
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: SigninDto) {
    try {
      const { username, password } = dto;

      const user = await this.users_service.findOne({ username });

      if (!user) {
        throw new BadRequestException('Invalid username/password.');
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new BadRequestException('Invalid username/password.');
      }

      const { full_name } = user;

      const [token, error] = await promise_tuplify(
        jwt_sign<UserJwtPayload>({ username, full_name }),
      );

      if (error) {
        throw new InternalServerErrorException('Internal Server Error.');
      }

      return token;
    } catch (error) {
      throw error;
    }
  }
}
