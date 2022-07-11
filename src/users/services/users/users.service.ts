import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    private users : User[] = []

    getUsers() {
        return this.users.map(user => new SerializedUser(user))
    }

    findUserByUsername(username: string) {
        return this.userRepository.findOne({ where: {username: username} })
    }

    getUserById(id: number) {
        return this.users.find(user => user.id === id)
    }

    createUser(createUserDto: CreateUserDto) {
        const password = encodePassword(createUserDto.password)
        console.log(password)
        const newUser = this.userRepository.create({...createUserDto, password});
        return this.userRepository.save(newUser)
    }

    findUserById(id: number) {
        return this.userRepository.findOne({where : {id: id}})
    }
}
