import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import * as admin from 'firebase-admin';

import * as fs from 'fs';
import * as path from 'path';

const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../service-account.json'), 'utf8'),
) as admin.ServiceAccount; // ✅ Use firebase-admin's type

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    try {
      await this.connection.asPromise();
      console.log('✅ Database connection is established');
    } catch (error) {
      console.error('❌ Database connection failed', error);
    }
  }

  async sendNotification(token: string, title: string, body: string) {
    await admin.messaging().send({
      token,
      notification: { title, body },
    });
  }
}
