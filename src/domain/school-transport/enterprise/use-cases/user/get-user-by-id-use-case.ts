import { Injectable } from "@nestjs/common";
import { Either, left, right } from "src/core/exceptions/either";
import { UserRepository } from "../../repositories/user-repository";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { User } from "src/domain/school-transport/entities/user";

interface GetUserByIdUseCaseRequest {
    userId: number
}

type GetUserByIdUseCaseResponse = Either<ResourceNotFoundError, {
    user: User
}>

@Injectable()
export class GetUserByIdUseCase{
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async execute(data: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
        const {userId} = data

        const user = await this.userRepository.findById(userId)

        if(!user) {
            return left(new ResourceNotFoundError())
        }

        return right({
            user
        })
    }
}