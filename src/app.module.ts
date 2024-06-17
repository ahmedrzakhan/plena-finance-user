import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './controller/user.controller';
import { AppService } from './app.service';
import { UserService } from './services/user.service';
import { UserDAO } from './dao/user.dao';

import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.schema';
import { BlockController } from './controller/block.controller';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AppController, UserController, BlockController],
  providers: [AppService, UserService, UserDAO],
})
export class AppModule {}
