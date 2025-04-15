import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { getAction } from '@nestjsx/crud';
import { Observable } from 'rxjs';

enum CrudActions {
  ReadAll = 'Read-All',
  ReadOne = 'Read-One',
  CreateOne = 'Create-One',
  CreateMany = 'Create-Many',
  UpdateOne = 'Update-One',
  ReplaceOne = 'Replace-One',
  DeleteOne = 'Delete-One',
}

@Injectable()
export class UserAppender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const handler = context.getHandler();

    const action = getAction(handler);
    const user = request.user;
    const body = request.body;

    if (user) {
      switch (action) {
        case CrudActions.CreateOne:
          body.created_by = { id: user.id };
          body.updated_by = { id: user.id };
          break;

        case CrudActions.UpdateOne:
        case CrudActions.ReplaceOne:
        default:
          body.updated_by = { id: user.id };
          break;
      }
    }

    return next.handle();
  }
}
