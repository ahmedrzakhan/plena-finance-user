import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './../models/user.schema';
import {
  CreateUserDto,
  UpdateUserDto,
  SearchUserDto,
} from '../validator/user.schema';

@Injectable()
class UserDAO {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...createUserDto,
      birthDate: new Date(createUserDto.birthDate),
    });
    return createdUser.save();
  }

  async findOne(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(userId, { $set: updateUserDto }, { new: true })
      .exec();
  }

  async delete(userId: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }

  async search(searchUserDto: SearchUserDto): Promise<User[]> {
    return this.userModel.find(searchUserDto).exec();
  }
}

export { UserDAO };
