import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/signup')
    async signUp(@Body() authCredentialDto:AuthCredentialDto):Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }
}
