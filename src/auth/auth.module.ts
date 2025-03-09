import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { walletSchema } from 'src/wallet/wallet.model';
import { WalletModule } from 'src/wallet/wallet.module';
import { WalletService } from 'src/wallet/wallet.service';
import { AuthController } from './auth.controller';
import { UserSchema } from './auth.model';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Wallet', schema: walletSchema }]),
    JwtModule.register({
      global: true,
      secret: 'defaultSecret',
      signOptions: { expiresIn: '3600s' },
    }),
    WalletModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, WalletService],
})
export class AuthModule {}
