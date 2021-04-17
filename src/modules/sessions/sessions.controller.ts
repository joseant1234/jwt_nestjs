import { Controller, Get, Post, UseGuards, Body, Req } from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { SessionsDtoReq } from './dto/sessions.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { GoogleAuthGuard } from '../../guards/google-auth.guard';
import { IAuth } from '../auth/interfaces/auth.interface';

@ApiBearerAuth()
@Controller('api/v1/sessions')
export class SessionsController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Body() data: SessionsDtoReq, @Req() req:Request) {
    return this.authService.login(req.user as IAuth);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(@Req() req) { }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: Request) {
    return this.authService.googleLogin(req.user as IAuth)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

}
