import { Module } from "@nestjs/common";
import { HashedService } from "src/domain/school-transport/enterprise/encrypt/hashed-service";
import { BcryptHashedService } from "./bcrypt/bcrypt-hashed.service";

@Module({
    imports: [],
    providers: [
        {
            provide: HashedService,
            useClass: BcryptHashedService
        }
    ],
    exports: [HashedService]
})
export class EncryptModule {}