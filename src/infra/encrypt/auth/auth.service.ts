import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenService } from 'src/domain/school-transport/enterprise/encrypt/generate-token-service';

@Injectable()
export class AuthService implements GenerateTokenService{
  constructor(
    private jwtService: JwtService
  ) {}

    async encrypt(payload: Record<string, any>): Promise<string> {
        return await this.jwtService.sign(payload) 
    }
}
