import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FirebaseService {
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

      if (!privateKey || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PROJECT_ID) {
        throw new Error('Nedostaju Firebase varijable u produkciji!');
      }

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
        storageBucket: 'pogrebno-poduzece-benjak-doo.firebasestorage.app',
      });
    } else {
      console.log('Firebase se ne koristi u lokalnom okruženju.');
    }
  }

  async uploadImage(file: Express.Multer.File, folder: string): Promise<string> {
    if (!file?.buffer) {
      throw new Error('Datoteka nema buffer - provjeri Multer storage!');
    }

    const safeName = file.originalname.replace(/\s+/g, '_');
    const fileName = `${folder}/${Date.now()}-${safeName}`;
    const bucket = admin.storage().bucket();
    const fileUpload = bucket.file(fileName);
    const downloadToken = uuidv4();

    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: downloadToken,
        },
      },
      validation: 'md5',
    });

    return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${downloadToken}`;
  }
}
