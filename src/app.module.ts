import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseModule } from './expense/expense.module';
import { AuthModule } from './auth/auth.module';
import { WalletController } from './wallet/wallet.controller';
import { WalletService } from './wallet/wallet.service';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kipkoech:kipkoech@nicktest.g7qzhuz.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=NickTest',
    ),
    ExpenseModule,
    AuthModule,
    WalletModule,
  ],
  controllers: [AppController, WalletController],
  providers: [AppService, WalletService],
})
export class AppModule {}
