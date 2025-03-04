import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, UserDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/create')
  async createUser(@Body() userDto: UserDto) {
    const newUser = await this.authService.createUser(userDto);
    return newUser;
  }
  @Post('user/login')
  async userLogin(@Body() loginDto: LoginDto) {
    return await this.authService.userLogin(loginDto);
  }
}
