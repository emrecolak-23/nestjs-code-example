import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { CreateAdressDto } from "./CreateAdress.dto";

export class CreateCustomerDto {
    @IsEmail()
    email:string;
    @IsNumber()
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateAdressDto)
    address: CreateAdressDto
}