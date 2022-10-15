import { IsNotEmpty } from "class-validator";

export class CreateCarDto {
    @IsNotEmpty()
    carType:string;
}