import { Injectable } from "@nestjs/common";
import { Either, right } from "src/core/exceptions/either";
import { UserRepository } from "../../repositories/user-repository";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { User } from "src/domain/school-transport/entities/user";

interface PaginatedResponse<T> {
    items: T[];
    page: number;
    limit: number;
    total: number;
    orderBy: string;
    sortDirection: 'asc' | 'desc';
  }

interface GetUserByIdUseCaseRequest {
    page: number;
    limit: number;
    orderBy: string;
    sortDirection: 'asc' | 'desc';
}

type GetUserByIdUseCaseResponse = Either<ResourceNotFoundError, PaginatedResponse<User>>

@Injectable()
export class GetUserByIdUseCase{
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async execute(data: GetUserByIdUseCaseRequest): Promise<GetUserByIdUseCaseResponse> {
        const {page, limit, orderBy, sortDirection} = data

        const users = await this.userRepository.findAll({
            page, limit, orderBy, sortDirection
        })

        return right({
            items: users,
            total: users.length,
            page: page,
            limit: limit,
            orderBy: orderBy,
            sortDirection: sortDirection
        })
    }
}