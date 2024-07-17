import { Controller,Post,Body,Put,Param, Req, Res, All, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { ScimService } from './scim.service';

@Controller('api/scim')
export class ScimController {
  constructor(private readonly scimService: ScimService) {}

  @All(':directoryId/:resourceType/:resourceId?')
  async handleScimRequest(@Req() req: Request, @Res() res: Response) {
    const directorySyncController = this.scimService.getController();
    const { method, body, query, headers, params } = req;
    const { directoryId, resourceType, resourceId } = params;

    if (!headers.authorization) {
      return res.status(400).json({ error: 'Authorization header is missing' });
    }

    const authToken = headers.authorization.split(' ')[1];

    const request = {
      method,
      body,
      directoryId,
      resourceId,
      resourceType: resourceType.toLowerCase(),
      apiSecret: authToken,
      query: {
        count: query.count ? parseInt(query.count as string) : undefined,
        startIndex: query.startIndex ? parseInt(query.startIndex as string) : undefined,
        filter: query.filter as string,
      },
    };

    const { status, data } = await directorySyncController.requests.handle(request);
    return res.status(status).json(data);
  }

  @Get('create-directory')
  async createDirectory(@Res() res: Response) {
    try {
      const directory = await this.scimService.createDirectory();
      return res.status(201).json(directory);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  @Post('users')
  async createUser(@Body() scimUser: any) {
    return this.scimService.createUser(scimUser);
  }

  @Put('users/:id')
  async updateUser(@Param('id') id: string, @Body() scimUser: any) {
    return this.scimService.updateUser(id, scimUser);
  }
  
}
