import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { ExtendedCrudService } from 'src/config';
import { Beneficiaire } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class BeneficiairesService extends ExtendedCrudService<Beneficiaire> {
  constructor(
    @InjectRepository(Beneficiaire) public repo: Repository<Beneficiaire>,
    private readonly logger: PinoLogger,
  ) {
    super(repo, true);
    this.logger.setContext(BeneficiairesService.name);
  }
}
