import { Injectable } from "@nestjs/common";
import { Either, right } from "src/core/exceptions/either";
import { UserRepository } from "../../repositories/user-repository";
import { User } from "src/domain/school-transport/entities/user";

export interface PaginatedResponse<T> {
    items: T[];
    page: number;
    limit: number;
    total: number;
    orderBy: string;
    sortDirection: 'asc' | 'desc';
  }

interface FetchUsersUseCaseRequest {
    page: number;
    limit: number;
    orderBy: string;
    sortDirection: 'asc' | 'desc';
}

type FetchUsersUseCaseResponse = Either<never, {pagination_params: PaginatedResponse<User>}
>

@Injectable()
export class FetchUsersUseCase{
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async execute(data: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
        const {page, limit, orderBy, sortDirection} = data

        const users = await this.userRepository.findAll({
            page, limit, orderBy, sortDirection
        })

        return right({
            pagination_params: {
                items: users,
                total: users.length,
                page: page,
                limit: limit,
                orderBy: orderBy,
                sortDirection: sortDirection
            }
        })
    }
}