import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private carsRepository: Repository<Car>,
      ) {}
    //private cars:CarModel[] = [];

    async getAllCars():Promise<Car[]> {
        return await this.carsRepository.find();
    }

    async getCarsByUserId(user:User):Promise<Car[]>{
        const query = this.carsRepository.createQueryBuilder('car');
        query.where('car.userId = :userId',{userId:user.id});
        const cars = await query.getMany();
        return cars;
    }
    
    async createCar( createCarDto:CreateCarDto,user:User):Promise<Car> {
        const {carType} =createCarDto
        
        const car = this.carsRepository.create({
            carType, 
            initDis:0,
            sumDis:0,
            user:user
        })
        //this.cars.push(car);
        await this.carsRepository.save(car)
        return car;
    }
    
    async getCarByCarId(id:number):Promise<Car> {
        // const car = this.carsRepository.find((car)=>car.carId ===carId)
        const car = await this.carsRepository.findOneBy({id});
        if(!car){
            throw new NotFoundException(`Can not found Car with car id ${id}`);
        }
        return car;
    }

    // async getCarByUserId(userId:string):Promise<Car> {
    //     //const car = this.cars.find((car)=>car.userId ===userId)
    //     const car = await this.carsRepository.findOneBy({userId});
    //     if(!car){
    //         throw new NotFoundException(`Can not found Car with user id ${userId}`);
    //     }
    //     return car;
    // }

    async updateCarSumDis(id:number, sumDis:number):Promise<Car>  {
        const car = await this.getCarByCarId(id)
        car.sumDis = sumDis;
        await this.carsRepository.save(car)
        return car;
    }


    async deleteCar (id:number,user:User):Promise<void> {
        // const result = await this.carsRepository.delete({id,user})
        const result = await this.carsRepository.delete({id})
        if(result.affected === 0) {
            throw new NotFoundException(`Can't find car with ${id}`);
        }
        console.log('result',result);
    }
}
