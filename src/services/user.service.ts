import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './../models/user.schema';
import { CreateUserDto } from '../validator/user.schema';
import { UserDAO } from './../dao/user.dao';

@Injectable()
class UserService {
  constructor(private readonly userDAO: UserDAO) {} // Inject the DAO

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    try {
      const savedUser = await this.userDAO.create(createUserDto);
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
    const user = await this.userDAO.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userDAO.findAll();
  }
}

export { UserService };
