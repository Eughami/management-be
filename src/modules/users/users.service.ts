import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtendedCrudService } from 'src/config';
import { User } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService extends ExtendedCrudService<User> {
  constructor(@InjectRepository(User) public repo: Repository<User>) {
    super(repo, true);
  }
}
