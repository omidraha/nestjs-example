import { Module } from '@nestjs/common';
import { ScimModule } from './scim/scim.module'; // Adjust the path as needed

@Module({
  imports: [ScimModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
