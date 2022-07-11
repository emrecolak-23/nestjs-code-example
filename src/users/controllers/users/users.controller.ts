import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, NotFoundException, Param, ParseIntPipe, Post, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly usersService: UsersService) {}
    
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('')
    getUsers() {
        const users = this.usersService.getUsers()
        return users
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    // @Get('username/:username')
    // getUsername(@Param('username') username: string) {
    //     const user = this.usersService.getUserName(username)
    //     if(user) return new SerializedUser(user)
    //     else throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    // }

    @UseFilters(HttpExceptionFilter)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        const user = this.usersService.getUserById(id)
        if(user) return new SerializedUser(user)
        else throw new UserNotFoundException()
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto)
    }

}
