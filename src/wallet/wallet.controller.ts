import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Post('load')
  async loadUserWallet(@Body() body: { walletID: string; amount: number }) {
    return await this.walletService.loadWallet(body.walletID, body.amount);
  }
}
