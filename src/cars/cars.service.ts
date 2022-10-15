import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { Repository } from 'typeorm';
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
    
    async createCar( createCarDto:CreateCarDto):Promise<Car> {
        const {carType} =createCarDto
        
        const car = this.carsRepository.create({
            carId:1, carType, 
            initDis:0,
            sumDis:0,
            userId:'',
        })
        //this.cars.push(car);
        await this.carsRepository.save(car)
        return car;
    }
    
    async getCarByCarId(carId:number):Promise<Car> {
        // const car = this.carsRepository.find((car)=>car.carId ===carId)
        const car = await this.carsRepository.findOneBy({carId});
        if(!car){
            throw new NotFoundException(`Can not found Car with car id ${carId}`);
        }
        return car;
    }

    async getCarByUserId(userId:string):Promise<Car> {
        //const car = this.cars.find((car)=>car.userId ===userId)
        const car = await this.carsRepository.findOneBy({userId});
        if(!car){
            throw new NotFoundException(`Can not found Car with user id ${userId}`);
        }
        return car;
    }

    async updateCarSumDis(id:number, sumDis:number):Promise<Car>  {
        const car = await this.getCarByCarId(id)
        car.sumDis = sumDis;
        await this.carsRepository.save(car)
        return car;
    }


    async deleteCar (id:number):Promise<void> {
        const result = await this.carsRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException(`Can't find car with ${id}`);
        }
        console.log('result',result);
    }
}
