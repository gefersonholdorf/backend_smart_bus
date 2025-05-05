import { Injectable } from "@nestjs/common";
import { PaginationParams } from "src/core/repositories/pagination-params";
import { UserRepository } from "src/domain/school-transport/enterprise/repositories/user-repository";
import { User } from "src/domain/school-transport/entities/user";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(user: User): Promise<void> {
        const data = PrismaUserMapper.toPrisma(user)

        await this.prisma.user.create({
            data
        })
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!user) {
            return null
        }

        return PrismaUserMapper.toDomain(user)
    }

    async findByCpf(cpf: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                cpf
            }
        })

        if(!user) {
            return null
        }

        return PrismaUserMapper.toDomain(user)
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            return null
        }

        return PrismaUserMapper.toDomain(user)
    }

    async findAll(paginationParams: PaginationParams): Promise<User[]> {
        const {page, limit, orderBy, sortDirection} = paginationParams

        const users = await this.prisma.user.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
              [orderBy]: sortDirection,
            },
          });
        
          return users.map(user => {
            return PrismaUserMapper.toDomain(user)
          });
    }

    async save(id: number, user: User): Promise<void> {
        const data = PrismaUserMapper.toPrisma(user)

        await this.prisma.user.update({
            data,
            where: {
                id
            }
        })
    }
}