import { Prisma, User as PrismaUser } from "generated/prisma";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { User } from "src/domain/school-transport/entities/user";

export class PrismaUserMapper {
    static toPrisma(user: User): Prisma.UserCreateInput {
        return {
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            address: user.address,
            phone: user.phone,
            password: user.password,
            role: user.role,
            status: user.status
        }
    }

    static toDomain(prismaUser: PrismaUser): User {
        return User.create({
            name: prismaUser.name,
            email: prismaUser.email,
            cpf: prismaUser.cpf,
            address: prismaUser.address,
            phone: prismaUser.phone,
            password: prismaUser.password,
            role: prismaUser.role,
            status: prismaUser.status
        },
        new UniqueEntityId(prismaUser.id))
    }
}