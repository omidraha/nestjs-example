import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ScimService } from './scim.service';

@Controller('scim')
export class ScimController {
  constructor(private readonly scimService: ScimService) {}

  @Post('Users')
  createUser(@Body() body) {
    // Delegate to SCIMMY for user creation
    return this.scimService.handleUserCreation(null, body);
  }

  @Get('Users/:id')
  getUser(@Param('id') id: string) {
    // Delegate to SCIMMY for user retrieval
    return this.scimService.handleUserRetrieval({ id });
  }

  @Delete('Users/:id')
  deleteUser(@Param('id') id: string) {
    // Delegate to SCIMMY for user deletion
    return this.scimService.handleUserDeletion({ id });
  }
}
