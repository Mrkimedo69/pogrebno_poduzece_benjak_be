import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { join } from 'path';
import { Express } from 'express';

@Injectable()
export class FirebaseService {
  constructor() {
    const serviceAccount = require(join(process.cwd(), 'config/firebase.json'));
    console.log('Looking for firebase.json at:', join(process.cwd(), 'config/firebase.json'));
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'pogrebno-poduzece-benjak-doo.firebasestorage.app',
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    const bucket = admin.storage().bucket();
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
        firebaseStorageDownloadTokens: fileName,
      },
      public: true,
      validation: 'md5',
    });

    return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;
  }
}
