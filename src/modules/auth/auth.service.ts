import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IAuth } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<IAuth> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserByUsername(username: string): Promise<IAuth> {
    const user = await this.usersService.findOne(username);
    if (!user) { return null; }
    const { password, ...result } = user;
    return result;
  }

  async validateUserByEmail(email: string): Promise<IAuth> {
    const user = await this.usersService.findOne(email);
    if (!user) { return null; }
    const { password, ...result } = user;
    return result;
  }


  async login(user: IAuth) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  googleLogin(user: IAuth) {
    return 'tests'
  }
}
