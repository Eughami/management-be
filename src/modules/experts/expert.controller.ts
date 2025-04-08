import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { crudGeneralOptions } from 'src/config';
import { Expert } from 'src/entities';
import { ExpertsService } from './expert.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  ...crudGeneralOptions,
  model: {
    type: Expert,
  },
  routes: {
    exclude: ['recoverOneBase', 'createManyBase'],
  },
})
@Controller('experts')
@ApiTags('Experts')
@UseInterceptors(CrudRequestInterceptor)
export class ExpertsController implements CrudController<Expert> {
  constructor(public readonly service: ExpertsService) {}
}
