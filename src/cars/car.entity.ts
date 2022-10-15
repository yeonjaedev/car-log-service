import { User } from 'src/auth/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Car extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  carType: string;

  @Column()
  initDis: number;

  @Column()
  sumDis: number; 

  @ManyToOne(type=>User,user=>user.cars,{eager:false})
  user:User;
}