import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './../models/user.schema';
import { CreateUserDto } from './../dto/user.dto';

@Injectable()
class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    try {
      const createdUser = new this.userModel({
        ...createUserDto,
        birthDate: new Date(createUserDto.birthDate),
      });
      const savedUser = await createdUser.save();
      return {
        message: 'User created successfully',
        user: savedUser,
      };
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('Username already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}

export { UserService };
