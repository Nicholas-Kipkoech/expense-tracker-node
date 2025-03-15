import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ExpenseModule } from './expense/expense.module';
import { WalletModule } from './wallet/wallet.module';
import { FileUploadService } from './file-upload/file-upload.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kipkoech:kipkoech@nicktest.g7qzhuz.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=NickTest',
    ),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Use your email provider’s SMTP server
        port: 587,
        secure: false, // True for 465, false for other ports
        auth: {
          user: 'nickey968@gmail.com', // Set in .env file
          pass: 'grba fdgl punj ysie', // Set in .env file
        },
      },
    }),
    ExpenseModule,
    AuthModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService, FileUploadService],
})
export class AppModule {}
