import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './controller/user.controller';
import { AppService } from './app.service';
import { UserService } from './services/user.service';

import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
