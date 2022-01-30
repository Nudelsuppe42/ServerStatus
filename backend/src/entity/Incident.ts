import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Incident {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    creator: string;

    @Column()
    report: string;

    @Column()
    status: string;


    @Column("simple-array")
    affected: string[];

    @Column({ type: "date" })
    date: Date; 
    
    @Column({ type: "timestamp" })
    time: Date;

}
