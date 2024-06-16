import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './../services/user.service';
import { CreateUserDto } from './../dto/user.dto';
import { User } from './../models/user.schema';

@Controller('users')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}

export { UserController };
