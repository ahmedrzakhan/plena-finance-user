import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import * as Joi from 'joi';
import { UserService } from './../services/user.service';
import {
  createUserSchema,
  getUserSchema,
  CreateUserDto,
  GetUserDto,
  UpdateUserDto,
  updateUserSchema,
  DeleteUserDto,
  deleteUserSchema,
} from '../validator/user.schema';
import { User } from './../models/user.schema';

@Controller('user')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; user?: User }> {
    const { error, value } = createUserSchema.validate(createUserDto);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return this.userService.create(value);
  }

  @Get(':userId')
  async findOne(@Param() getUserDto: GetUserDto): Promise<User> {
    const { error, value } = getUserSchema.validate(getUserDto);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return this.userService.findOne(value);
  }

  @Put(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { error: userIdError } = Joi.string()
      .length(24)
      .hex()
      .validate(userId);
    if (userIdError) {
      throw new BadRequestException('Invalid userId format');
    }

    const { error, value } = updateUserSchema.validate(updateUserDto);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return this.userService.update(userId, value);
  }

  @Delete(':userId')
  async delete(
    @Param() deleteUserDto: DeleteUserDto,
  ): Promise<{ message: string }> {
    const { error, value } = deleteUserSchema.validate(deleteUserDto);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    return this.userService.delete(value);
  }
}

export { UserController };
