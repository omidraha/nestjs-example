import { Injectable } from '@nestjs/common';
import jackson, { JacksonOption } from '@boxyhq/saml-jackson';
import { UsersService } from '../users/users.service';


@Injectable()
export class ScimService {
  private directorySyncController: any;
  constructor(private readonly usersService: UsersService) {
    this.init();
  }


  async init() {
    const opts: JacksonOption = {
      externalUrl: 'http://localhost:3000',
      samlPath: '/',
      scimPath: '/api/scim',
      db: {
        engine: 'sql',
        type: 'sqlite',
        url: 'file:./path-to-your-sqlite-database-file',
      },
    };

    if (!global.directorySyncController) {
      const ret = await jackson(opts);
      this.directorySyncController = ret.directorySyncController;
      global.directorySyncController = this.directorySyncController;
    } else {
      this.directorySyncController = global.directorySyncController;
    }
  }

  getController() {
    return this.directorySyncController;
  }

  async createDirectory() {
    const directorySyncController = this.getController();
    const { data, error } = await directorySyncController.directories.create({
      name: 'Test Directory',
      type: 'okta-scim-v2',
      tenant: 'tenant-identifier',
      product: 'product-identifier',
    });
    if (error) {
      throw new Error('Error creating directory');
    }
    return data;
  }

  async createUser(scimUser: any): Promise<any> {
    const createUserDto = {
      userName: scimUser.userName,
      givenName: scimUser.name.givenName,
      familyName: scimUser.name.familyName,
      email: scimUser.emails[0].value,
      department: scimUser.department,
      employeeNumber: scimUser.employeeNumber,
    };

    const user = await this.usersService.create(createUserDto);
    return this.mapToScimUser(user);
  }

  async updateUser(id: string, scimUser: any): Promise<any> {
    const updateUserDto = {
      userName: scimUser.userName,
      givenName: scimUser.name.givenName,
      familyName: scimUser.name.familyName,
      email: scimUser.emails[0].value,
      department: scimUser.department,
      employeeNumber: scimUser.employeeNumber,
    };

    const user = await this.usersService.update(id, updateUserDto);
    return this.mapToScimUser(user);
  }

  private mapToScimUser(user: any): any {
    return {
      schemas: ['urn:ietf:params:scim:schemas:core:2.0:User'],
      id: user.id,
      userName: user.userName,
      name: {
        givenName: user.givenName,
        familyName: user.familyName,
      },
      emails: [
        {
          value: user.email,
          primary: true,
        },
      ],
      department: user.department,
      employeeNumber: user.employeeNumber,
    };
  }
}
