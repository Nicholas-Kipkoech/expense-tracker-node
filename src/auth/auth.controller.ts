import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, UserDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/create')
  async createUser(@Body() userDto: UserDto) {
    return await this.authService.createUser(userDto);
  }
  @Post('user/login')
  async userLogin(@Body() loginDto: LoginDto) {
    return await this.authService.userLogin(loginDto);
  }
}
