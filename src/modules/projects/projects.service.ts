import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtendedCrudService } from 'src/config';
import { Project } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService extends ExtendedCrudService<Project> {
  constructor(@InjectRepository(Project) public repo: Repository<Project>) {
    super(repo, true);
  }
}
