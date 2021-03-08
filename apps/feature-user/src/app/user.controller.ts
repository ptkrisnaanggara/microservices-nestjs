import { JwtAuthGuard } from '@microservices-realworld-example-app/auth';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto
} from '@microservices-realworld-example-app/models';
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMe(@Req() req): Promise<UserDto> {
    return req.user;
  }

  @Get('/users')
  getUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UserDto | null> {
    return this.userService.findById(id);
  }

  @Get('/username/:username')
  getUserByUsername(@Param('username') username: string): Promise<UserDto | null> {
    return this.userService.findOne({username});
  }

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string): Promise<UserDto | null> {
    return this.userService.findOne({email});
  }

  @Post('/')
  createUser(@Body() body: CreateUserDto): Promise<UserDto | null> {
    return this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/')
  updateUser(@Body() body: UpdateUserDto): Promise<UserDto | null> {
    return this.userService.update(body);
  }

}
