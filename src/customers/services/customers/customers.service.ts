import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {

    private customers : Customer[] = [
        {
            id: 1,
            email: 'colakkemre@gmail.com',
            name: 'Emre'
        },
        {
            id: 2,
            email: 'eymen@gmail.com',
            name: 'Eymen'
        },
        {
            id: 3,
            email: 'elif@gmail.com',
            name: 'Elif'
        }
    ]

    findCustormerById(id: number) {
        return this.customers.find(user => user.id === id)
    }

    createCustomer(customerDto: CreateCustomerDto) {
        this.customers.push(customerDto)
    }

    getCustomers() {
        return this.customers
    }
}
