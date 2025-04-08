import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { crudGeneralOptions } from 'src/config';
import { User } from 'src/entities';
import { UsersService } from './users.service';

@Crud({
  ...crudGeneralOptions,
  model: {
    type: User,
  },
  routes: {
    exclude: ['recoverOneBase'],
  },
})
@Controller('users')
@UseInterceptors(CrudRequestInterceptor)
export class UsersController implements CrudController<User> {
  constructor(public readonly service: UsersService) {}
}
