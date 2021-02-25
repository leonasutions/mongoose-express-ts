import { Document, Model, model, Schema } from "mongoose";
import * as bcrypt from 'bcrypt-nodejs';

/**
 * Interface to model the User Schema for TypeScript.
 * @param email:string
 * @param password:string
 * @param avatar:string
 */
export interface IUser extends Document {
  
  email: string;
  password: string;
  name:string;
  phone:string;
  kota:string;
  alamat:string;
  tempatLahir:string;
  tanggalLahir:string;
  kelompok:string;
  nomorKTP:string;
  nomorNPWP:string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: { type: String, required: true },
  kota:{type:String,required:true},
  alamat:{type:String,required:true},
  tempatLahir:{type:String,required:true},
  tanggalLahir:{type:String,required:true},
  kelompok:{type:String,required:true},
  nomorKTP:{type:String,required:true},
  nomorNPWP:{type:String,required:true},
  password: {
    type: String,
    required: true
  },
},{
  timestamps: {
    createdAt: 'tanggal_pembuatan',
    updatedAt: 'tanggal_perubahan',
  },
  collection: 'user',
},);

userSchema.pre<IUser>('save', function (next) {
  const user = this as IUser;
  const SALT_WORK_FACTOR = 10;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

const User: Model<IUser> = model("User", userSchema);

export default User;
