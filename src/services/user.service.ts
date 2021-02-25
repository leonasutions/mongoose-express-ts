import { Injectable, Inject } from '@nestjs/common';
import { Model, model } from 'mongoose';
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
import UserModel, { IUser } from "../models/User";


@Injectable()
export class UserService {
    constructor(@Inject('UserModelToken') private readonly : Model<IUser>) { }
    async createUser(userData): Promise<IUser> {
        return await UserModel.create(userData) as IUser;
    }
}