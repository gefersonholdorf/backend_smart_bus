import { Injectable } from "@nestjs/common";
import { Either, left, right } from "src/core/exceptions/either";
import { UserRepository } from "../../repositories/user-repository";
import { HashedService } from "../../encrypt/hashed-service";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";

interface ChangePasswordUseCaseRequest {
    userId: number
    password: string
}

type ChangePasswordUseCaseResponse = Either<ResourceNotFoundError, {}>

@Injectable()
export class ChangePasswordUseCase{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashedService: HashedService
    ) {}

    async execute(data: ChangePasswordUseCaseRequest): Promise<ChangePasswordUseCaseResponse> {
        const {userId, password} = data

        const user = await this.userRepository.findById(userId)

        if(!user) {
            return left(new ResourceNotFoundError())
        }

        const passwordHashed = await this.hashedService.encrypt(password)

        user.password = passwordHashed

        await this.userRepository.save(userId, user)

        return right({})
    }
}