import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { ExtendedCrudService } from 'src/config';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService extends ExtendedCrudService<User> {
  constructor(
    @InjectRepository(User) public repo: Repository<User>,
    private readonly logger: PinoLogger,
  ) {
    super(repo, true);
    this.logger.setContext(UsersService.name);
  }
}
