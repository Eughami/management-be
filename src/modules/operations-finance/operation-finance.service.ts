import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { ExtendedCrudService } from 'src/config';
import { OperationFinance } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class OperationFinancesService extends ExtendedCrudService<OperationFinance> {
  constructor(
    @InjectRepository(OperationFinance)
    public repo: Repository<OperationFinance>,
    private readonly logger: PinoLogger,
  ) {
    super(repo, true);
    this.logger.setContext(OperationFinancesService.name);
  }
}
