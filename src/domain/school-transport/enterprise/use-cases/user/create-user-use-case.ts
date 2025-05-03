import { Injectable } from "@nestjs/common";
import { Either, left, right } from "src/core/exceptions/either";
import { UserRepository } from "../../repositories/user-repository";
import { HashedService } from "../../encrypt/hashed-service";
import { ExistingUserError } from "src/core/exceptions/errors/existing-user-error";
import { User, ROLE } from "src/domain/school-transport/entities/user";

interface CreateUserUseCaseRequest {
    name: string
    email: string
    cpf: string
    phone: string
    address: string
    password: string
    role: ROLE
}

type CreateUserUseCaseResponse = Either<ExistingUserError, {}>

@Injectable()
export class CreateUserUseCase{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashedService: HashedService
    ) {}

    async execute(data: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const {name, email, cpf, phone, address, password, role} = data

        const existingUserByCpf = await this.userRepository.findByCpf(cpf)

        const existingUserByEmail = await this.userRepository.findByEmail(email)

        if(existingUserByCpf || existingUserByEmail) {
            return left(new ExistingUserError())
        }

        const passwordHashed = await this.hashedService.encrypt(password)

        const user = User.create({name, email, cpf, phone, address, password: passwordHashed, role})

        await this.userRepository.create(user)

        return right({})
    }
}