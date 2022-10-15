import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Car } from './car.entity';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('cars')
@UseGuards(AuthGuard())
export class CarsController {
    constructor(private carsService: CarsService){}

    // @Get()
    // getAllCars(){
    //     return this.carsService.getAllCars();
    // }

    @Get()
    getCarByUserId(@GetUser() user:User){
        return this.carsService.getCarsByUserId(user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    
    createCar(
        @Body() createCarDto:CreateCarDto,
        @GetUser() user:User):Promise<Car> {
        //return this.carsService.createCar(body.carModel,body.carNum,body.distanceMileage)
        return this.carsService.createCar(createCarDto,user)
    }

    @Get('/:id')
    getCarByCarId(@Param('id') id:number){
        return this.carsService.getCarByCarId(id)
    }

    // @Get('/:userId')
    // getCarByUserId(@Param('userId') userId:string){
    //     return this.carsService.getCarByUserId(userId)
    // }

    @Delete('/:id')
    deleteCar(@Param('id',ParseIntPipe)id:number):Promise<void>{
        return this.carsService.deleteCar(id)

    }

    @Patch('/:id/sumDis')
    updateCarSumDis(
        @Param('id',ParseIntPipe) id:number,
        @Body('sumDis') sumDis:number
    ) {
        return this.carsService.updateCarSumDis(id,sumDis)
    }
}
