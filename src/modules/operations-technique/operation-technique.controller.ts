import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { crudGeneralOptions } from 'src/config';
import { OperationTechnique } from 'src/entities';
import { OperationTechniquesService } from './operation-technique.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  ...crudGeneralOptions,
  model: {
    type: OperationTechnique,
  },
  routes: {
    exclude: ['recoverOneBase', 'createManyBase'],
  },
})
@Controller('operations-techniques')
@ApiTags('Operation Techniques')
@UseInterceptors(CrudRequestInterceptor)
export class OperationTechniquesController
  implements CrudController<OperationTechnique>
{
  constructor(public readonly service: OperationTechniquesService) {}
}
