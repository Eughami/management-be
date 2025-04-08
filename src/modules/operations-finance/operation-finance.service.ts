import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtendedCrudService } from 'src/config';
import { OperationFinance } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class OperationFinancesService extends ExtendedCrudService<OperationFinance> {
  constructor(
    @InjectRepository(OperationFinance)
    public repo: Repository<OperationFinance>,
  ) {
    super(repo, true);
  }
}
