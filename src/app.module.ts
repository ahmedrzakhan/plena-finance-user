import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserController } from './controller/user.controller';
import { AppService } from './app.service';
import { UserService } from './services/user.service';
import { BlockUserService } from './services/blockUser.service';
import { UserDAO } from './dao/user.dao';
import { BlockedUserDAO } from './dao/blockedUser.dao';

import { UserSchema } from './models/user.schema';
import { BlockedUserSchema } from './models/blockedUser.schema';
import { BlockUserController } from './controller/blockUser.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'BlockedUser', schema: BlockedUserSchema },
    ]),
  ],
  controllers: [AppController, UserController, BlockUserController],
  providers: [
    AppService,
    UserService,
    BlockUserService,
    UserDAO,
    BlockedUserDAO,
  ],
})
export class AppModule {}
