import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { EncryptModule } from "../encrypt/encrypt.module";
import { CreateUserController } from "./controllers/user/create-user.controller";
import { CreateUserUseCase } from "src/domain/school-transport/enterprise/use-cases/user/create-user-use-case";

@Module({
    imports: [
        DatabaseModule, EncryptModule
    ],
    controllers: [
        CreateUserController
    ],
    providers: [
        CreateUserUseCase
    ]
})
export class HttpModule{}