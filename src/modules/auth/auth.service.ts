import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users';
import { LoginPayload, LoginResponse } from 'src/interfaces';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(AuthService.name);
  }

  async login(dto: LoginPayload): Promise<LoginResponse> {
    try {
      const user = await this.userService.repo.findOne({
        where: { email: dto.email },
      });
      const isPasswordCorrect = await compare(dto.password, user.password);
      if (!isPasswordCorrect) throw Error();

      const accessToken = this.jwtService.sign({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      });

      await this.userService.repo.update(user.id, { accessToken });
      return {
        email: user.email,
        id: user.id,
        accessToken,
      };
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
