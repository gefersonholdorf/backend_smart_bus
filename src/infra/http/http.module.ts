import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { EncryptModule } from "../encrypt/encrypt.module";
import { CreateUserController } from "./controllers/user/create-user.controller";
import { CreateUserUseCase } from "src/domain/school-transport/enterprise/use-cases/user/create-user-use-case";
import { LoginController } from "./controllers/auth/login.controller";
import { LoginUseCase } from "src/domain/school-transport/enterprise/use-cases/auth/login-use-case";
import { GetUserByIdController } from "./controllers/user/get-user-by-id-use-case.controller";
import { GetUserByIdUseCase } from "src/domain/school-transport/enterprise/use-cases/user/get-user-by-id-use-case";
import { FetchUsersController } from "./controllers/user/fetch-users-use-case.controller";
import { FetchUsersUseCase } from "src/domain/school-transport/enterprise/use-cases/user/fetch-users-use-case";
import { UpdateUserController } from "./controllers/user/update-user-use-case.controller";
import { ChangePasswordController } from "./controllers/user/change-password-use-case.controller";
import { UpdateUserUseCase } from "src/domain/school-transport/enterprise/use-cases/user/update-user-use-case";
import { ChangePasswordUseCase } from "src/domain/school-transport/enterprise/use-cases/user/change-password-use-case";

@Module({
    imports: [
        DatabaseModule, EncryptModule
    ],
    controllers: [
        CreateUserController, LoginController, GetUserByIdController, FetchUsersController, UpdateUserController,
        ChangePasswordController
    ],
    providers: [
        CreateUserUseCase, LoginUseCase, GetUserByIdUseCase, FetchUsersUseCase, UpdateUserUseCase,
        ChangePasswordUseCase
    ]
})
export class HttpModule{}