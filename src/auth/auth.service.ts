import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordUtil } from 'src/helpers/password-hash';
import { LoginDto, UserDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDto>,
    private jwtService: JwtService,
  ) {}

  async createUser(userDto: UserDto) {
    const email = userDto.email.toLowerCase();
    const existingUser = await this.userModel.findOne({ email: userDto.email });
    if (existingUser) {
      return {
        success: false,
        message: `${existingUser.email} already exists!`,
      };
    }
    const hashedPassword = await PasswordUtil.encryptPassword(userDto.password);
    const newUser = new this.userModel({
      ...userDto,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    return { success: true, message: 'Account created success', user: newUser };
  }
  async userLogin(loginDto: LoginDto) {
    const existingUser = await this.userModel.findOne({
      email: loginDto.email,
    });
    if (!existingUser) {
      return {
        success: false,
        message: 'Account not found! Contact the admnistrator',
      };
    }
    const isValidPass = await PasswordUtil.comparePassword(
      loginDto.password,
      existingUser.password,
    );
    if (!isValidPass) {
      return { success: false, message: 'password is invalid' };
    }
    const payload = { sub: existingUser.email, userId: existingUser._id };
    return {
      success: true,
      message: 'logged in successfully',
      access_token: await this.jwtService.signAsync(payload, {
        secret: 'defaultKey',
      }),
    };
  }
}
