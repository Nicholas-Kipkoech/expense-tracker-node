import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiResponse } from 'src/helpers/api-response.service';
import { WalletDto } from './wallet.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<WalletDto>,
  ) {}

  async createUserWallet(email: string) {
    const userWallet = new this.walletModel({
      userId: email,
      name: 'expenses',
      balance: 0,
      currency: 'KES',
    });
    await userWallet.save();
  }
  async loadWallet(walletID: string, amount: number) {
    // get wallet balance

    const wallet = await this.walletModel.findById(walletID);
    if (!wallet) {
      return ApiResponse(false, 'wallet not found', null);
    }
    // update new balance with the amount passed
    wallet.balance = (Number(wallet.balance) || 0) + amount;
    await wallet.save();
    return ApiResponse(true, 'wallet debited successfully', wallet.balance);
  }
}
