import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { SessionsDtoReq } from './dto/sessions.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('api/v1/sessions')
export class SessionsController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('')
  async login(@Body() data: SessionsDtoReq) {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
