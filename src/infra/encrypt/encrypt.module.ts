import { Module } from "@nestjs/common";
import { HashedService } from "src/domain/school-transport/enterprise/encrypt/hashed-service";
import { BcryptHashedService } from "./bcrypt/bcrypt-hashed.service";
import { JwtModule } from "@nestjs/jwt";
import { GenerateTokenService } from "src/domain/school-transport/enterprise/encrypt/generate-token-service";
import { AuthService } from "./auth/auth.service";
import { jwtConstants } from "./auth/constants";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";

@Module({
    imports: [JwtModule.register({
        global: true,
        secret: jwtConstants.secret,
        signOptions: {
            expiresIn: '1d'
        }
    })],
    providers: [
        {
            provide: HashedService,
            useClass: BcryptHashedService
        },
        {
            provide: GenerateTokenService,
            useClass: AuthService
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
    exports: [HashedService, GenerateTokenService]
})
export class EncryptModule {}