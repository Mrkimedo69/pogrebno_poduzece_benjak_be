import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      const serviceAccount = JSON.parse(
        (process.env.FIREBASE_CONFIG || '').replace(/\\n/g, '\n')
      );

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'pogrebno-poduzece-benjak-doo.appspot.com',
      });
    } else {
      console.log('Firebase se ne koristi u lokalnom okruženju.');
    }
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
