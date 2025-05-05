import { Injectable } from "@nestjs/common";
import { Either, left, right } from "src/core/exceptions/either";
import { UserRepository } from "../../repositories/user-repository";
import { CredentialsInvalidError } from "src/core/exceptions/errors/credentials-invalid-error";
import { HashedService } from "../../encrypt/hashed-service";
import { GenerateTokenService } from "../../encrypt/generate-token-service";

interface LoginUseCaseRequest {
    cpf: string
    password: string
}

type LoginUseCaseResponse = Either<CredentialsInvalidError, {
    access_token: string
}>

@Injectable()
export class LoginUseCase{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashedService: HashedService,
        private readonly generateTokenService: GenerateTokenService
    ) {}

    async execute(data: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
        const {cpf, password} = data

        const user = await this.userRepository.findByCpf(cpf)

        if(!user) {
            return left(new CredentialsInvalidError())
        }

        const isPasswordValid = await this.hashedService.compare(password, user.password)

        if(!isPasswordValid) {
            return left(new CredentialsInvalidError())
        }

        const token = await this.generateTokenService.encrypt({
            userId: user.id,
            role: user.role
        })

        return right({
            access_token: token
        })
    }
}