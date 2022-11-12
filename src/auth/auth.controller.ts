import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard.guard';
import { CustomRequest } from 'src/interfaces/custom-request.model';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async self(@Req() request: CustomRequest) {
    const { user } = request;

    const res = {
      status: 'Success',
      data: user,
    };

    return res;
  }

  @Post('signup')
  async signup(@Body() signup_dto: SignupDto) {
    try {
      const _ = await this.authService.signup(signup_dto);

      const res = {
        status: 'Success',
        message: 'Signed up successfully',
      };

      return res;
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async signin(@Body() signin_dto: SigninDto) {
    try {
      const result = await this.authService.signin(signin_dto);

      const res = {
        status: 'Success',
        message: 'Logged in successfully',
        data: {
          access_token: result,
        },
      };

      return res;
    } catch (error) {
      throw error;
    }
  }
}
