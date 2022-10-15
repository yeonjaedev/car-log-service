import { Body, Controller, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/signin')
    async signIp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<{accessToken:string}> {
        return this.authService.signIn(authCredentialDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User){
        console.log('req',user)
    }
}
