import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './../models/user.schema';
import {
  CreateUserDto,
  GetUserDto,
  DeleteUserDto,
  UpdateUserDto,
  SearchUserDto,
} from '../validator/user.schema';
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

  async findOne(getUserDao: GetUserDto): Promise<User> {
    const user = await this.userDAO.findOne(getUserDao.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${getUserDao.userId} not found`,
      );
    }
    return user;
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: User }> {
    const updatedUser = await this.userDAO.update(userId, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return { user: updatedUser, message: 'User updated successfully' };
  }

  async delete(deleteUserDto: DeleteUserDto): Promise<{ message: string }> {
    const user = await this.userDAO.delete(deleteUserDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${deleteUserDto.userId} not found`,
      );
    }

    return { message: 'User deleted successfully' };
  }

  async search(searchUserDto: SearchUserDto): Promise<{ users: User[] }> {
    const users = await this.userDAO.search(searchUserDto);
    return { users };
  }
}

export { UserService };
