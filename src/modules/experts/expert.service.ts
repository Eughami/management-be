import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtendedCrudService } from 'src/config';
import { Expert } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ExpertsService extends ExtendedCrudService<Expert> {
  constructor(@InjectRepository(Expert) public repo: Repository<Expert>) {
    super(repo, true);
  }
}
