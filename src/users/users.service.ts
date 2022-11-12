import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  @InjectRepository(Users)
  private readonly user_repo: Repository<Users>;

  async create(input: SignupDto) {
    try {
      const { username, password } = input;

      if (await this.findOne({ username })) {
        throw new BadRequestException('Username already exists.');
      }

      const hash = await bcrypt.hash(password, 10);

      const new_user = await this.user_repo.save({ ...input, password: hash });

      return new_user;
    } catch (error) {
      throw error;
    }
  }

  async findOne(criteria: Partial<Users>) {
    try {
      const user = await this.user_repo.findOne({ where: criteria });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
