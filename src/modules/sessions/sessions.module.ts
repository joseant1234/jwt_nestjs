import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SessionsController } from './sessions.controller';

@Module({
  controllers: [
    SessionsController,
  ],
  imports: [AuthModule],
})
export class SessionsModule {}
