import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { crudGeneralOptions } from 'src/config';
import { Beneficiaire } from 'src/entities';
import { BeneficiairesService } from './beneficiaire.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  ...crudGeneralOptions,
  model: {
    type: Beneficiaire,
  },
  routes: {
    exclude: ['recoverOneBase', 'createManyBase'],
  },
  query: {
    ...crudGeneralOptions.query,
    join: {
      ...crudGeneralOptions.query.join,
      projects: {
        eager: false,
      },
    },
  },
})
@Controller('beneficiaires')
@ApiTags('Beneficiaires')
@UseInterceptors(CrudRequestInterceptor)
export class BeneficiairesController implements CrudController<Beneficiaire> {
  constructor(public readonly service: BeneficiairesService) {}
}
