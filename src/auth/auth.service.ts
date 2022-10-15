import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
    ) {}

    async createUser (authCredentialDto:AuthCredentialDto):Promise<void> {
        const {username,password} = authCredentialDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = this.userRepository.create({username,password:hashedPassword});

        try{
            await this.userRepository.save(user);
        } catch (error) {
            if(error.code === '23505'){
                throw new ConflictException('Existing username');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signUp(authCredentialDto:AuthCredentialDto):Promise<void> {
        return this.createUser(authCredentialDto);
    }

    async signIn(authCredentialDto:AuthCredentialDto):Promise<string>{
        const {username,password} = authCredentialDto;
        const user = await  this.userRepository.findOne({ where: { username: username } });
        if(user && (await bcrypt.compare(password,user.password))){
            return 'login success';
        } else {
            throw new UnauthorizedException('login falied')
        }
    }

}
