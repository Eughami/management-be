import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getRequestFromContext } from 'src/utilities';
import { User } from 'src/entities';

const excludedPath = ['auth/login'];

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(@InjectRepository(User) public usersRepo: Repository<User>) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = getRequestFromContext(context);
    if (excludedPath.some((path) => request.url.includes(path))) {
      return true;
    }
    console.log('head :', ExtractJwt.fromAuthHeaderAsBearerToken()(request));
    const canActivate = await (super.canActivate(context) as Promise<boolean>);
    if (canActivate) {
      const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
      const user = await this.usersRepo.findOneBy({ id: request.user.id });

      if (user.role !== request.user.role) {
        throw new UnauthorizedException(
          'Your role has been modified, please login again',
        );
      }

      if (!user?.accessToken) {
        throw new ForbiddenException('Invalid Login');
      }

      if (user.accessToken !== accessToken) {
        throw new UnauthorizedException('Login from another location.');
      }
    }
    return canActivate;
  }

  handleRequest(err, user, info) {
    console.log('handleRequest called:', { err, user, info });

    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
