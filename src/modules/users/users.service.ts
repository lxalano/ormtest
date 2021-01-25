import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find({ relations: ['photos'] });
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id, { relations: ['photos'] });
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async create(user): Promise<User> {
        const { name } = user;
        const u = await getRepository(User).findOne({ where: { name } });

        //判断是否有重名的用户
        if (u) {
            throw new HttpException(
                {
                    message: '数据验证失败',
                    error: '用户名重复了',
                },
                HttpStatus.BAD_REQUEST,
            )
        }
        return await this.usersRepository.save(user);
    }


}
