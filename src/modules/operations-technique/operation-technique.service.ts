import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { ExtendedCrudService } from 'src/config';
import { OperationTechnique } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class OperationTechniquesService extends ExtendedCrudService<OperationTechnique> {
  constructor(
    @InjectRepository(OperationTechnique)
    public repo: Repository<OperationTechnique>,
    private readonly logger: PinoLogger,
  ) {
    super(repo, true);
    this.logger.setContext(OperationTechniquesService.name);
  }
}
