import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kipkoech:kipkoech@nicktest.g7qzhuz.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=NickTest',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
