import { UserJwtPayloadDto } from './user-jwt-payload.dto';

export class RequestContextData {
  user?: UserJwtPayloadDto;
  requestId?: string;
  ip?: string;
}
