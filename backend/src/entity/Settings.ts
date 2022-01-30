import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    default: string;
    
    @Column()
    value: string;


}
