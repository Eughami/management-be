import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { crudGeneralOptions } from 'src/config';
import { Project } from 'src/entities';
import { ProjectsService } from './projects.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  ...crudGeneralOptions,
  model: {
    type: Project,
  },
  routes: {
    exclude: ['recoverOneBase', 'createManyBase'],
  },
})
@Controller('projects')
@ApiTags('Projects')
@UseInterceptors(CrudRequestInterceptor)
export class ProjectsController implements CrudController<Project> {
  constructor(public readonly service: ProjectsService) {}
}
