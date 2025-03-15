import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/auth.dto';

@Injectable()
export class FileUploadService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async updateProfilePicture(userId: string, filePath: string) {
    return this.userModel.findByIdAndUpdate(userId, {
      profilePicture: filePath,
    });
  }
}
