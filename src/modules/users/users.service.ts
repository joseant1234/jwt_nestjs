import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [
    {
      userId: 1,
      username: 'tests',
      password: '123456',
      email: 'tests@gmail.com',
    },
    {
      userId: 2,
      username: 'demos',
      password: '123456',
      email: 'demos@gmail.com',
    },
  ];

  async findOne(username: string): Promise<IUser | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findOneByEmail(email: string): Promise<IUser | undefined> {
    return this.users.find(user => user.email === email);
  }
}
