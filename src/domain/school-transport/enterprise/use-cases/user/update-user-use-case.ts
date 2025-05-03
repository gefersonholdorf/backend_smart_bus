import { Injectable } from "@nestjs/common";
import { Either, left, right } from "src/core/exceptions/either";
import { UserRepository } from "../../repositories/user-repository";
import { HashedService } from "../../encrypt/hashed-service";
import { ROLE } from "src/domain/school-transport/entities/user";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";

interface UpdateUserUseCaseRequest {
    userId: number
    name?: string
    phone?: string
    address?: string
    password?: string
    role?: ROLE
}

type UpdateUserUseCaseResponse = Either<ResourceNotFoundError, {}>

@Injectable()
export class UpdateUserUseCase{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashedService: HashedService
    ) {}

    async execute(data: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const {userId, name, phone, address, password, role} = data

        const user = await this.userRepository.findById(userId)

        if(!user) {
            return left(new ResourceNotFoundError())
        }

        const passwordHashed = password ? await this.hashedService.encrypt(password) : user.password

        user.name = name ?? user.name
        user.phone = phone ?? user.phone
        user.address = address ?? user.address
        user.role = role ?? user.role
        user.password = passwordHashed

        await this.userRepository.save(userId, user)

        return right({})
    }
}