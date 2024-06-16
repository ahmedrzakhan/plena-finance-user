import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './../services/user.service';
import { createUserSchema, CreateUserDto } from '../validator/user.schema';
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
  async findOne(@Param('userId') userId: string): Promise<User> {
    return this.userService.findOne(userId);
  }
}

export { UserController };
