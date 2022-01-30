import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    creator: string;
    
    @Column()
    description: string;

    @Column()
    status: string;

}
