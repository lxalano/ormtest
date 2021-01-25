import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    @Get()
    findAll() {
        return this.usersService.findAll();
    }
    @Get(':id')
    findOne(@Param() { id }) {
        return this.usersService.findOne(id);
    }
    @Delete()
    async remove(@Query() { id }) {
        return this.usersService.remove(id);
    }
    @Post()
    async create(@Body() users) {
        const newParam = { ...Param, status: true };
        await this.usersService.create(newParam);
        return true;
    }


}
