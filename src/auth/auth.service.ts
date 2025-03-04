import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordUtil } from 'src/helpers/password-hash';
import { LoginDto, UserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private userModel: Model<UserDto>) {}

  async createUser(userDto: UserDto) {
    const existingUser = await this.userModel.findOne({ email: userDto.email });
    if (existingUser) {
      return {
        success: false,
        message: `${existingUser.email} already exists!`,
      };
    }
    const hashedPassword = await PasswordUtil.encryptPassword(userDto.password);
    userDto.password = hashedPassword;
    const newUser = new this.userModel(userDto);
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
    return { success: true, message: 'logged in successfully' };
  }
}
