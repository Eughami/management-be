import { BadRequestException } from '@nestjs/common';
import { CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

export class ExtendedCrudService<T> extends TypeOrmCrudService<T> {
  constructor(
    public repo: Repository<T>,
    public useSoftDelete = false,
  ) {
    super(repo);
  }

  async deleteOne(req: CrudRequest): Promise<void | T> {
    const { returnDeleted } = req.options.routes.deleteOneBase;
    // const userId = req.parsed.search.$and.pop()['id'].$eq;
    const idFilter = req.parsed?.search?.$and?.find(
      (clause) => clause && typeof clause === 'object' && 'id' in clause,
    );

    const userId = idFilter?.['id']?.$eq;

    if (!userId) {
      throw new BadRequestException('User ID not found in filters');
    }
    const found = await this.getOneOrFail(req, returnDeleted);
    const toReturn = returnDeleted
      ? plainToClass(this.entityType, { ...found })
      : undefined;

    await this.repo.save({ ...found, updatedBy: { id: userId } });

    if (this.useSoftDelete) {
      await this.repo.softRemove(found);
    } else {
      await this.repo.remove(found);
    }

    return toReturn;
  }

  async getMany(req: CrudRequest): Promise<GetManyDefaultResponse<T> | T[]> {
    const withDeleted = req.parsed.filter.find(
      ({ field }) => field === 'deletedAt',
    );
    // If querying with deleted perform special request
    if (withDeleted) {
      const qb = await super.createBuilder(req.parsed, req.options);
      // Query db *and* include deleted records, *and* exclude records that haven't been soft-deleted
      const finalQB = qb.withDeleted();

      return super.doGetMany(finalQB, req.parsed, req.options);
    }
    return super.getMany(req);
  }
}
