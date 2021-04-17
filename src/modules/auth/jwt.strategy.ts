import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../../const/auth';
import { IAuth, IPayloadAuth } from './interfaces/auth.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: IPayloadAuth): Promise<IAuth> {
    const user = await this.authService.validateUserByUsername(payload.username);
    const { userId, username } = user;
    return { userId, username };
    // return { userId: payload.sub, username: payload.username };
  }
}
