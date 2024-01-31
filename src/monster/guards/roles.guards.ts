import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private role: string) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const jwtToken = request.get('Authorization')?.split(' ')[1];
    const jwtService = new JwtService();
    const decodedJwtAccessToken = jwtService.decode(jwtToken);
    return decodedJwtAccessToken && decodedJwtAccessToken.role === this.role;
  }
}
