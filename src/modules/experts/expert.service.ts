import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { ExtendedCrudService } from 'src/config';
import { Expert } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ExpertsService extends ExtendedCrudService<Expert> {
  constructor(
    @InjectRepository(Expert) public repo: Repository<Expert>,
    private readonly logger: PinoLogger,
  ) {
    super(repo, true);
    this.logger.setContext(ExpertsService.name);
  }
}
