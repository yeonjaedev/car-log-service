import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Car extends BaseEntity{
  @PrimaryGeneratedColumn()
  carId: number;

  @Column()
  carType: string;

  @Column()
  initDis: number;

  @Column()
  sumDis: number; 

  @Column()
  userId: string;
}