import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
    constructor(private customerService: CustomersService) {

    }
    @Get(':id')
    getCustomers(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Res() res: Response) {
        const customer = this.customerService.findCustormerById(id)
        if(customer) {
            res.status(200).send(customer)
        }else {
            res.status(404).send({message: 'Customer not found'})
        }
    }

    @Get('/search/:id')
    searchCustomerById(@Param('id', ParseIntPipe) id: number) {
        const customer = this.customerService.findCustormerById(id)
        if (customer) return customer
        else throw new HttpException('Customer not found!!', HttpStatus.NOT_FOUND)
    }

    @Get('')
    getAllCustomer() {
        return this.customerService.getCustomers()
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        console.log(createCustomerDto)
        this.customerService.createCustomer(createCustomerDto)
    }
}
