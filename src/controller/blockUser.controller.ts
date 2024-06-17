import * as Joi from 'joi';
import {
  Controller,
  Post,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { BlockUserService } from '../services/blockUser.service';
import {
  UnblockUserDto,
  unblockUserSchema,
  BlockUserDto,
  blockUserSchema,
} from '../validator/blockedUser.schema';
import { BlockedUser } from './../models/blockedUser.schema';

@Controller('blocked-users')
export class BlockUserController {
  constructor(private readonly blockUserService: BlockUserService) {}

  @Post(':userId/block')
  async blockUser(
    @Param('userId') userId: string,
    @Body() blockUserDto: BlockUserDto,
  ): Promise<{ message: string; blockedUser: BlockedUser }> {
    const { error: userIdError } = Joi.string()
      .length(24)
      .hex()
      .validate(userId);
    if (userIdError) {
      throw new BadRequestException('Invalid userId format');
    }

    const { error, value } = blockUserSchema.validate(blockUserDto);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    const { blockedUser } = await this.blockUserService.blockUsers(
      userId,
      value,
    );
    return {
      blockedUser,
      message: 'User blocked successfully',
    };
  }

  @Post(':userId/unblock')
  async unblockUser(
    @Param('userId') userId: string,
    @Body() unblockUserDto: UnblockUserDto,
  ): Promise<{ unblockedUser: BlockedUser; message: string }> {
    const { error: userIdError } = Joi.string()
      .length(24)
      .hex()
      .validate(userId);
    if (userIdError) {
      throw new BadRequestException('Invalid userId format');
    }

    const { error, value } = unblockUserSchema.validate(unblockUserDto);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    const { unblockedUser } = await this.blockUserService.unblockUsers(
      userId,
      value,
    );
    return {
      message: 'Users unblocked successfully',
      unblockedUser,
    };
  }
}
