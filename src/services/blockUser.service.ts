import { Injectable, NotFoundException } from '@nestjs/common';
import { UnblockUserDto, BlockUserDto } from '../validator/blockedUser.schema';
import { BlockedUserDAO } from './../dao/blockedUser.dao';
import { BlockedUser } from './../models/blockedUser.schema';

@Injectable()
class BlockUserService {
  constructor(private readonly blockUserDAO: BlockedUserDAO) {} // Inject the DAO

  async blockUsers(
    userId: string,
    blockUserDto: BlockUserDto,
  ): Promise<{ blockedUser: BlockedUser }> {
    const updatedUser = await this.blockUserDAO.blockUsers(
      userId,
      blockUserDto,
    );
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return {
      blockedUser: updatedUser,
    };
  }

  async unblockUsers(
    userId: string,
    unblockUserDto: UnblockUserDto,
  ): Promise<{ unblockedUser: BlockedUser }> {
    const updatedUser = await this.blockUserDAO.unblockUsers(
      userId,
      unblockUserDto,
    );
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return {
      unblockedUser: updatedUser,
    };
  }
}

export { BlockUserService };
