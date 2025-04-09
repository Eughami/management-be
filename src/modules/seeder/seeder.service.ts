import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(@InjectRepository(User) public userRepo: Repository<User>) {}

  async onModuleInit() {
    const users = await this.userRepo.find();
    if (!users?.length) {
      await this.userRepo.save({
        name: 'System admin',
        email: 'admin@admin.sys',
        password: await bcrypt.hash('admin321', 10),
      });
    }
  }
}
