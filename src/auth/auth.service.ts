import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/helpers/api-response.service';
import { PasswordUtil } from 'src/helpers/password-hash';
import { WalletService } from 'src/wallet/wallet.service';
import { LoginDto, UserDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<UserDto>,
    private jwtService: JwtService,
    private walletService: WalletService,
    private mailerService: MailerService,
  ) {}
  /**
   *
   * @param userDto user Request for creating the body
   * @returns
   */
  async createUser(userDto: UserDto) {
    const email = userDto.email.toLowerCase();
    const existingUser = await this.userModel.findOne({ email: userDto.email });
    if (existingUser) {
      return ApiResponse(false, `${existingUser.email} already exists!`, null);
    }
    const hashedPassword = await PasswordUtil.encryptPassword(userDto.password);
    const newUser = new this.userModel({
      ...userDto,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    /** use user email as userID */
    const userID = newUser.email;
    await this.walletService.createUserWallet(userID);
    await this.mailerService.sendMail({
      to: newUser.email,
      subject: 'Account created successfully',
      text: `Dear ${newUser.firstName} ${newUser.lastName} \n . Your account has been created successfully`,
    });
    return ApiResponse(true, 'account created successfully', newUser);
  }
  // User Login handler
  async userLogin(loginDto: LoginDto) {
    const existingUser = await this.userModel.findOne({
      email: loginDto.email,
    });
    if (!existingUser) {
      return ApiResponse(
        false,
        'Account not found! Contact the admnistrator',
        null,
      );
    }
    const isValidPass = await PasswordUtil.comparePassword(
      loginDto.password,
      existingUser.password,
    );
    if (!isValidPass) {
      return ApiResponse(false, 'password is invalid', null);
    }
    const payload = { sub: existingUser.email, userId: existingUser._id };
    return ApiResponse(true, 'logged in successfully', {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: 'defaultKey',
      }),
    });
  }
}
