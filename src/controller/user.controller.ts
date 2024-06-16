import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './../services/user.service';
import { CreateUserDto } from './../dto/user.dto';
import { User } from './../models/user.schema';

@Controller('users')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; user?: User }> {
    return this.userService.create(createUserDto);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<User> {
    // read from JWT
    return this.userService.findOne(userId);
  }
}

export { UserController };
