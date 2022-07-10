import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(4)
    username: string;

    @IsNotEmpty()
    @MinLength(5)
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}