import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginPayload, LoginResponse } from 'src/interfaces';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Sign in with username and password' })
  @ApiResponse({ type: LoginResponse })
  signIn(@Body() dto: LoginPayload): Promise<LoginResponse> {
    return this.authService.login(dto);
  }
}
