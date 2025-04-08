#!/bin/bash

# Check if folder name is provided as argument
if [ -z "$1" ]
then
  echo "Please provide a folder name as argument"
  exit 1
fi

# Create a new folder with the provided name
fn=$(echo "$1" | awk '{print tolower($0)}')
mkdir "src/modules/$fn"

# Change into the new folder
cd "src/modules/$fn"

# Create index
cat << EOF > "index.ts"
export * from './$fn.controller';
export * from './$fn.module';
export * from './$fn.service';
EOF

# Create Module
cat << EOF > "$fn.module.ts"
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { $1 } from 'src/entities';
import { $1Controller } from './$fn.controller';
import { $1Service } from './$fn.service';

@Module({
  imports: [TypeOrmModule.forFeature([$1])],
  controllers: [$1Controller],
  providers: [$1Service],
  exports: [$1Service],
})
export class $1Module {}
EOF

# Create Controller
cat << EOF > "$fn.controller.ts"
import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { crudGeneralOptions } from 'src/config';
import { $1 } from 'src/entities';
import { $1Service } from './$fn.service';

@Crud({
  ...crudGeneralOptions,
  model: {
    type: $1,
  },
  routes: {
    exclude: ['recoverOneBase'],
  },
})
@Controller('$fn')
@UseInterceptors(CrudRequestInterceptor)
export class $1Controller implements CrudController<$1> {
  constructor(public readonly service: $1Service) {}
}
EOF

# Create Service
cat << EOF > "$fn.service.ts"
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtendedCrudService } from 'src/config';
import { $1 } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class $1Service extends ExtendedCrudService<$1> {
  constructor(@InjectRepository($1) public repo: Repository<$1>) {
    super(repo, true);
  }
}
EOF

cd ..

echo "export * from './$fn';" >> index.ts
