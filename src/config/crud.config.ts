import { CrudOptions } from '@nestjsx/crud';

export const crudGeneralOptions: Partial<CrudOptions> = {
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    maxLimit: 100,
    cache: 2000,
    softDelete: true,
    alwaysPaginate: true,
    exclude: ['password', 'accessToken'],
    join: {
      createdBy: {
        eager: true,
        allow: ['role', 'firstName', 'lastName', 'email'],
      },
      updatedBy: {
        eager: true,
        allow: ['role', 'firstName', 'lastName', 'email'],
      },
    },
  },
};
