import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { crudGeneralOptions } from 'src/config';
import { OperationFinance } from 'src/entities';
import { OperationFinancesService } from './operation-finance.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  ...crudGeneralOptions,
  model: {
    type: OperationFinance,
  },
  routes: {
    exclude: ['recoverOneBase', 'createManyBase'],
  },
})
@Controller('operations-finance')
@ApiTags('Operation Finances')
@UseInterceptors(CrudRequestInterceptor)
export class OperationFinancesController
  implements CrudController<OperationFinance>
{
  constructor(public readonly service: OperationFinancesService) {}
}
