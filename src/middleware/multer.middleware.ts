import multer from 'multer';
import  mkdirp from 'mkdirp';
import  crypto from 'crypto';
import { join } from 'path';
import  mime from 'mime';
import  fs from 'fs';
const config = require('config');

export const diskStorageRegistration = multer.diskStorage({
    destination: function (req, file, cb) {
      const type = 'Pendaftaran';
      let user;
      if (req.body.name !== undefined) {
        user = req.body.name;
      } else {
        user = req.user.username;
      }
      const upload_path = join(config.get('STATIC.UPLOAD_PATH'), user, type);
  
      // ensure  access log directory exists
      mkdirp(upload_path, err => cb(err, upload_path));
    },
    // filename: function (req, file, cb) {
    //   cb(null, req.user.username + '.' + mime.extension(file.mimetype));
    // }
    filename: function (req, file, cb) {
      const currentTime = new Date();
      const dd = currentTime.getDate();
      const mm = currentTime.getMonth() + 1; // January is 0!
      const yyyy = currentTime.getFullYear();
      let dd2, mm2;
  
      if (dd < 10) {
        dd2 = '0' + dd;
      } else {
        dd2 = dd.toString();
      }
  
      if (mm < 10) {
        mm2 = '0' + mm;
      } else {
        mm2 = mm.toString();
      }
  
      crypto.pseudoRandomBytes(16, function (err, raw) {
        // cb(null, + yyyy + mm2 + dd2 + '-' + raw.toString('hex') + '.' + mime.extension(file.mimetype));
        cb(
          null,
          +yyyy +
          mm2 +
          dd2 +
          '-' +
          raw.toString('hex') +
          '.' +
          mime.getExtension(file.mimetype),
        );
      });
    },
  });

export const multerOptionsRegistration = {
    storage: diskStorageRegistration,
    limits: { fileSize: 10 * 1024 * 1024 },
  };