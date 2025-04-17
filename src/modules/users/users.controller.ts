import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { crudGeneralOptions } from 'src/config';
import { User } from 'src/entities';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAppender } from 'src/interceptors';

@Crud({
  ...crudGeneralOptions,
  model: {
    type: User,
  },
  routes: {
    exclude: ['recoverOneBase', 'createManyBase'],
  },
})
@ApiBearerAuth()
@Controller('users')
@ApiTags('Users')
@UseInterceptors(UserAppender)
export class UsersController implements CrudController<User> {
  constructor(public readonly service: UsersService) {}
}
