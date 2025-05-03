import { Module } from "@nestjs/common";
import { UserRepository } from "src/domain/school-transport/enterprise/repositories/user-repository";
import { PrismaUserRepository } from "./prisma/repositories/prisma-user-repository";
import { PrismaService } from "./prisma/prisma.service";

@Module({
    imports: [],
    providers: [
        PrismaService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        }
    ],
    exports: [PrismaService, UserRepository]
})
export class DatabaseModule{}