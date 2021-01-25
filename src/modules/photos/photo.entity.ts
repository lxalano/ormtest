import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity'


@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 120 })
    url: string;

    @ManyToOne(() => User, user => user.photos)
    user: User;
}