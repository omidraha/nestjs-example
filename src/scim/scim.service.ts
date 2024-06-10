import { Injectable } from '@nestjs/common';
import SCIMMY from 'scimmy';

@Injectable()
export class ScimService {
  constructor() {
    const resources = new SCIMMY.Resources.User();

    SCIMMY.Resources.declare(resources)
      .ingress((resource, data) => this.handleUserCreation(resource, data))
      .egress((resource) => this.handleUserRetrieval(resource))
      .degress((resource) => this.handleUserDeletion(resource));
  }

  handleUserCreation(resource, data) {
    return { message: 'User created', resource, data };
  }

  handleUserRetrieval(resource) {
    return { message: 'User retrieved', resource };
  }

  handleUserDeletion(resource) {
    return { message: 'User deleted', resource };
  }
}
