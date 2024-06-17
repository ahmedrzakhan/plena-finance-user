import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlockedUser } from '../models/blockedUser.schema';
import { UnblockUserDto, BlockUserDto } from '../validator/blockedUser.schema';

@Injectable()
class BlockedUserDAO {
  constructor(
    @InjectModel('BlockedUser')
    private readonly blockedUserModel: Model<BlockedUser>,
  ) {}

  async blockUsers(
    userId: string,
    blockUserDto: BlockUserDto,
  ): Promise<BlockedUser> {
    const user = await this.blockedUserModel
      .findOneAndUpdate(
        { userId },
        { $addToSet: { blockedUsers: blockUserDto.blockedUsers } },
        { new: true, upsert: true },
      )
      .exec();
    return user;
  }

  async unblockUsers(
    userId: string,
    unblockUserDto: UnblockUserDto,
  ): Promise<BlockedUser> {
    const user = await this.blockedUserModel
      .findOneAndUpdate(
        { userId },
        { $pullAll: { blockedUsers: unblockUserDto.unblockedUsers } },
        { new: true },
      )
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}

export { BlockedUserDAO };
