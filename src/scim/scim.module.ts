import { Module } from '@nestjs/common';
import { ScimService } from './scim.service';
import { ScimController } from './scim.controller';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [UsersModule],
  controllers: [ScimController],
  providers: [ScimService],
  exports: [ScimService],
})
export class ScimModule {}
