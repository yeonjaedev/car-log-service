import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Car } from './cars/car.entity';
import { CarsModule } from './cars/cars.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [CarsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Cheerup1!',
      database: 'carlog',
      entities: [Car,User],
      synchronize: true,
    }),
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
