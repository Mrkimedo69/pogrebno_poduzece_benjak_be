import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseService } from '../firebase/firebase.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { memoryStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('upload')
export class UploadController {
  constructor(private readonly firebaseService: FirebaseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: process.env.NODE_ENV === 'production'
      ? memoryStorage()
      : diskStorage({
        destination: (req, file, cb) => {
          const dir = './uploads';
          if (!existsSync(dir)) mkdirSync(dir);
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueName}${extname(file.originalname)}`);
        }
    }),
  }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (process.env.NODE_ENV === 'production') {
      if (!file || !file.buffer) {
        throw new Error('Firebase upload failed: file buffer missing.');
      }
      const url = await this.firebaseService.uploadImage(file, 'article_images');
      return { imageUrl: url };
    }else {
      const localUrl = `/uploads/article_images/${file.filename}`;
      return { imageUrl: localUrl };
    }
  }

  @Post('upload-texture')
  @UseInterceptors(FileInterceptor('file', {
    storage: process.env.NODE_ENV === 'production'
      ? memoryStorage()
      : diskStorage({
          destination: (req, file, cb) => {
            const dir = './uploads/textures';
            if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
            cb(null, dir);
          },
          filename: (req, file, cb) => {
            const uniqueName = `${Date.now()}-${uuidv4()}${extname(file.originalname)}`;
            cb(null, uniqueName);
          }
      }),
  }))
  async uploadTexture(@UploadedFile() file: Express.Multer.File) {
    if (process.env.NODE_ENV === 'production') {
      const url = await this.firebaseService.uploadImage(file, 'textures');
      return { imageUrl: url };
    } else {
      return { imageUrl: `/uploads/textures/${file.filename}` };
    }
  }


}
