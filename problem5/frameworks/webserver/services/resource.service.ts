import { IResourceRepo } from '@application/repositories/IResource.repo';
import { IResourceSchema } from '@frameworks/database/mongodb/models/resource.model';

import { BaseServices } from './base.service';

export class ResourceService extends BaseServices<IResourceSchema> {
  constructor(protected repo: IResourceRepo) {
    super(repo);
  }
}
