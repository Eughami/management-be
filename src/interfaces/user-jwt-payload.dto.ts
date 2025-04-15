import { RolesEnum } from 'src/entities';

export class UserJwtPayloadDto {
  id: string;
  email: string;
  role: RolesEnum;
  name: string;
}
